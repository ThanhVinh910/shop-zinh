"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Trang chủ", href: "/" },
  { name: "Sản phẩm", href: "/Sanpham" },
  { name: "Giới thiệu", href: "/gioi-thieu" },
  { name: "Báo giá", href: "/Lienhe" },
];

export default function Header() {
  const pathname = usePathname() || "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          INK ZÍNH®
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            // Chia rõ 2 class string để giảm rủi ro ký tự lạ
            const activeClass =
              "rounded-md bg-[var(--color-brand-primary)] px-4 py-2 font-semibold text-white";
            const normalClass =
              "text-gray-600 hover:text-[var(--color-brand-primary)] font-medium transition-colors";

            return (
              <Link key={item.name} href={item.href}>
                <span
                  className={`transition-colors ${
                    isActive ? activeClass : normalClass
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="md:hidden">
          <button
            className="text-gray-700 focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
