"use client";

import { useLanguage } from "./language-provider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="page-shell flex justify-center pb-2 pt-3 text-center md:pb-3 md:pt-4">
      <div className="mx-auto max-w-[820px]">
        <h1 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.04em] sm:text-[38px] md:text-[44px]">
          {t.hero.title}
        </h1>

        <p className="mx-auto mt-3 max-w-[680px] text-sm leading-6 text-[#6b7280] md:text-[15px]">
          {t.hero.description}
        </p>
      </div>
    </section>
  );
}
