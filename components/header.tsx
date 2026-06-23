"use client";

import { getAlternateLocalePath } from "@/lib/locale-path";
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

  return (
    <header className="page-shell relative flex min-h-[82px] flex-wrap items-center justify-between gap-y-3 py-4 md:flex-nowrap md:py-0">
      <a href={homeHref} aria-label="AI Plan Map home">
        <BrandMark />
      </a>

      <nav
        aria-label="Primary navigation"
        className="order-3 flex w-full items-center justify-center gap-6 text-xs font-medium text-[#303642] md:absolute md:left-1/2 md:order-none md:w-auto md:-translate-x-1/2 md:gap-10 md:text-[13px]"
      >
        <a className="transition-colors hover:text-[#0071e3]" href={homeHref}>
          {t.header.home}
        </a>
        <a className="transition-colors hover:text-[#0071e3]" href={blogHref}>
          {t.header.blog}
        </a>
        <a className="transition-colors hover:text-[#0071e3]" href={aboutHref}>
          {t.header.about}
        </a>
      </nav>

      <a
        className="inline-flex min-h-9 items-center px-3 text-xs font-medium text-[#4b5563] transition-colors hover:text-[#0071e3]"
        href={getAlternateLocalePath(pathname)}
      >
        {isChinese ? "EN" : "中文"}
      </a>
    </header>
  );
}
