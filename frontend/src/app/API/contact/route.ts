// src/app/api/contact/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Minimal TypeScript types for nodemailer usage in this file.
 * We declare only what's needed to avoid `any` while keeping dynamic import.
 */
interface NodemailerTransportOptions {
  host: string;
  port: number;
  secure?: boolean;
  auth?: { user: string; pass: string };
}

interface NodemailerMailOptions {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
}

interface NodemailerTransporter {
  sendMail(mail: NodemailerMailOptions): Promise<unknown>;
}

interface NodemailerModule {
  createTransport(opts: NodemailerTransportOptions): NodemailerTransporter;
}

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function validate(body: ContactBody) {
  if (!body) return "Yêu cầu rỗng";
  if (!body.name || String(body.name).trim().length < 2) return "Tên không hợp lệ";
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) return "Email không hợp lệ";
  if (!body.message || String(body.message).trim().length < 5) return "Nội dung quá ngắn";
  return null;
}

/** Simple in-memory rate limiter */
const RATE_WINDOW_MS = 60 * 1000;
const RATE_MAX = 6;
const ipMap: Map<string, { count: number; expiresAt: number }> = new Map();

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || entry.expiresAt < now) {
    ipMap.set(ip, { count: 1, expiresAt: now + RATE_WINDOW_MS });
    return { ok: true };
  }
  if (entry.count >= RATE_MAX) {
    return { ok: false, retryAfter: Math.ceil((entry.expiresAt - now) / 1000) };
  }
  entry.count++;
  ipMap.set(ip, entry);
  return { ok: true };
}

function buildPlainText(body: ContactBody) {
  return [
    `Contact from website`,
    `Name: ${body.name}`,
    `Email: ${body.email}`,
    `Phone: ${body.phone ?? "-"}`,
    `Subject: ${body.subject ?? "-"}`,
    `Message:`,
    `${body.message}`,
  ].join("\n");
}

function buildHtml(body: ContactBody) {
  const safe = (v?: string) => (v ? String(v).replace(/\n/g, "<br/>") : "-");
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; color:#111;">
      <h2>Contact from website</h2>
      <p><strong>Name:</strong> ${safe(body.name)}</p>
      <p><strong>Email:</strong> ${safe(body.email)}</p>
      <p><strong>Phone:</strong> ${safe(body.phone)}</p>
      <p><strong>Subject:</strong> ${safe(body.subject)}</p>
      <hr/>
      <div><strong>Message:</strong><div style="margin-top:8px">${safe(body.message)}</div></div>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  try {
    const xff = req.headers.get("x-forwarded-for");
    const ip = xff ? xff.split(",")[0].trim() : req.headers.get("x-real-ip") ?? "unknown";

    // rate limit
    const rl = rateLimit(ip);
    if (!rl.ok) {
      return NextResponse.json({ error: `Quá nhiều yêu cầu. Vui lòng thử lại sau ${rl.retryAfter}s.` }, { status: 429 });
    }

    const body = (await req.json()) as ContactBody;
    const err = validate(body);
    if (err) return NextResponse.json({ error: err }, { status: 400 });

    const text = buildPlainText(body);
    const html = buildHtml(body);

    // prefer SendGrid (HTTP API)
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const TO_EMAIL = process.env.TO_EMAIL;
    const FROM_EMAIL = process.env.FROM_EMAIL ?? process.env.SMTP_USER;

    if (SENDGRID_API_KEY && TO_EMAIL && FROM_EMAIL) {
      try {
        const payload = {
          personalizations: [{ to: [{ email: TO_EMAIL }] }],
          from: { email: FROM_EMAIL },
          subject: `Liên hệ từ website: ${body.subject ?? "Không có tiêu đề"}`,
          content: [
            { type: "text/plain", value: text },
            { type: "text/html", value: html },
          ],
        };

        const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SENDGRID_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          console.error("SendGrid error:", res.status, txt);
          return NextResponse.json({ error: "Không gửi được email (SendGrid)." }, { status: 500 });
        }

        console.log("Contact sent via SendGrid to", TO_EMAIL);
        return NextResponse.json({ ok: true });
      } catch (sendErr) {
        console.error("SendGrid send err:", sendErr);
        // fallthrough to SMTP attempt if configured
      }
    }

    // Fallback: SMTP via nodemailer (dynamic import). We use explicit types above to avoid `any`.
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
    if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && TO_EMAIL) {
      try {
        const nodemailerModule = (await import("nodemailer")) as unknown;
        // assert to our minimal interface
        const nodemailer = nodemailerModule as NodemailerModule;

        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT),
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        });

        await transporter.sendMail({
          from: FROM_EMAIL ?? SMTP_USER,
          to: TO_EMAIL,
          subject: `Liên hệ từ website: ${body.subject ?? "Không có tiêu đề"}`,
          text,
          html,
        });

        console.log("Contact sent via SMTP to", TO_EMAIL);
        return NextResponse.json({ ok: true });
      } catch (sendErr) {
        console.error("SMTP send err:", sendErr);
        return NextResponse.json({ error: "Không gửi được email (SMTP)." }, { status: 500 });
      }
    }

    // no provider configured
    console.log("Contact (no mail provider):", body);
    return NextResponse.json({ ok: true, note: "No mail provider configured - logged on server." });
  } catch (error) {
    console.error("API /api/contact error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
