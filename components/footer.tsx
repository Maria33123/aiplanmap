"use client";

import { BrandMark } from "./brand-mark";
import { useLanguage } from "./language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="page-shell mt-6 scroll-mt-8 border-t border-[#e5e7eb] py-8"
      id="footer"
    >
      <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
        <div>
          <BrandMark compact />
          <p className="mt-3 max-w-[280px] text-xs leading-5 text-[#7a8392]">
            {t.footer.description}
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-[#4b5563] md:justify-end"
        >
          {t.footer.links.map((item) => (
            <a
              className="transition-colors hover:text-[#0071e3]"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <p className="mt-7 text-[10px] text-[#8a929f]">
        {t.footer.copyright}
      </p>
    </footer>
  );
}
