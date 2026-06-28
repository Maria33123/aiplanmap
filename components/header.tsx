"use client";

import { getAlternateLocalePath } from "@/lib/locale-path";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandMark } from "./brand-mark";
import { useLanguage } from "./language-provider";

export function Header() {
  const { locale, t } = useLanguage();
  const pathname = usePathname();

  const isChinese = locale === "zh";

  const homeHref = isChinese ? "/zh" : "/";
  const blogHref = isChinese ? "/zh/blog" : "/blog";
  const aboutHref = isChinese ? "/zh/platform-notice" : "/platform-notice";
  const languageHref = getAlternateLocalePath(pathname);

  return (
    <header className="page-shell relative z-20 flex min-h-[64px] flex-wrap items-center justify-between gap-y-2 py-3 md:flex-nowrap md:py-0">
      <Link
        href={homeHref}
        aria-label="AI Plan Map home"
        className="relative z-30 flex shrink-0"
      >
        <BrandMark />
      </Link>

      <nav
        aria-label="Primary navigation"
        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-[13px] font-medium text-[#303642] md:flex"
      >
        <Link
          className="pointer-events-auto transition-colors hover:text-[#0071e3]"
          href={homeHref}
        >
          {t.header.home}
        </Link>

        <Link
          className="pointer-events-auto transition-colors hover:text-[#0071e3]"
          href={blogHref}
        >
          {t.header.blog}
        </Link>

        <Link
          className="pointer-events-auto transition-colors hover:text-[#0071e3]"
          href={aboutHref}
        >
          {t.header.about}
        </Link>
      </nav>

      <Link
        className="relative z-40 inline-flex min-h-8 shrink-0 items-center px-3 text-xs font-medium text-[#4b5563] transition-colors hover:text-[#0071e3]"
        href={languageHref}
        aria-label={isChinese ? "Switch to English" : "切换到中文"}
      >
        {isChinese ? "EN" : "中文"}
      </Link>

      <nav
        aria-label="Mobile navigation"
        className="order-3 flex w-full items-center justify-center gap-5 text-xs font-medium text-[#303642] md:hidden"
      >
        <Link className="transition-colors hover:text-[#0071e3]" href={homeHref}>
          {t.header.home}
        </Link>

        <Link className="transition-colors hover:text-[#0071e3]" href={blogHref}>
          {t.header.blog}
        </Link>

        <Link className="transition-colors hover:text-[#0071e3]" href={aboutHref}>
          {t.header.about}
        </Link>
      </nav>
    </header>
  );
}
