"use client";

import { useLanguage } from "./language-provider";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="page-shell flex justify-center pb-2 pt-9 text-center md:pb-3 md:pt-12">
      <div className="mx-auto max-w-[860px]">
        <h1 className="text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-[56px]">
          {t.hero.title}
        </h1>
        <p className="mx-auto mt-5 max-w-[720px] text-sm leading-7 text-[#6b7280] md:text-base">
          {t.hero.description}
        </p>
      </div>
    </section>
  );
}
