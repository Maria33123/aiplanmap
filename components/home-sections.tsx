"use client";

import { guides, subscriptions } from "@/lib/data";
import { useLanguage } from "./language-provider";

const guideSlugs = [
  "is-shared-ai-subscription-safe",
  "cheapest-way-to-use-chatgpt-plus",
  "gamsgo-vs-spliiit",
  "how-to-stop-overpaying-for-ai-tools",
] as const;

export function SubscriptionGrid() {
  const { locale, t } = useLanguage();
  const finderHref = `/finder?lang=${locale}`;

  return (
    <section className="page-shell section-space scroll-mt-8" id="subscriptions">
      <h2 className="text-[24px] font-semibold tracking-[-0.03em]">
        {t.subscriptions.title}
      </h2>
      <p className="mt-1 text-xs text-[#7a8392]">
        {t.subscriptions.description}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {subscriptions.map((item) => (
          <article className="surface card-hover rounded-2xl p-4" key={item.name}>
            <div className="flex items-center gap-3">
              <span className={`grid h-9 w-9 place-items-center rounded-xl font-bold ${item.accent}`}>
                {item.mark}
              </span>
              <h3 className="text-sm font-semibold">{item.name}</h3>
            </div>
            <dl className="mt-4 space-y-3 text-[12px]">
              <div className="flex justify-between">
                <dt className="text-[#68717f]">{t.subscriptions.officialPrice}</dt>
                <dd className="font-semibold">
                  {localizeMonthlyPrice(item.officialPrice, locale)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#68717f]">{t.subscriptions.bestOption}</dt>
                <dd className="font-semibold">
                  {localizeMonthlyPrice(item.bestPrice, locale)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#68717f]">{t.subscriptions.potentialSaving}</dt>
                <dd className="font-semibold text-[#079447]">{item.saving}</dd>
              </div>
            </dl>
            <a
              className="mt-4 block w-full rounded-lg border border-[#e1e5ea] bg-white/70 py-2.5 text-center text-[11px] font-medium text-[#374151] transition hover:border-[#bfc9d5] hover:bg-white"
              href={finderHref}
            >
              {t.subscriptions.viewOptions}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export function PlatformComparison() {
  const { t } = useLanguage();

  return (
    <section className="page-shell section-space scroll-mt-8 border-t border-[#e5e7eb] pt-8" id="platforms">
      <h2 className="text-xl font-semibold tracking-[-0.025em]">
        {t.platforms.title}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {t.platforms.values.map((platform) => (
          <article className="rounded-[18px] border border-[#e5e7eb] bg-white p-4" key={platform.name}>
            <h3 className="text-sm font-semibold">{platform.name}</h3>
            <p className="mt-2 min-h-10 text-[12px] leading-5 text-[#697281]">
              {platform.description}
            </p>
            <span className="mt-3 inline-flex text-[10px] font-medium text-[#526071]">
              {platform.tag}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function GuidesSection() {
  const { locale, t } = useLanguage();

  return (
    <section className="page-shell section-space scroll-mt-8 border-t border-[#e5e7eb] pt-8" id="guides">
      <h2 className="text-xl font-semibold tracking-[-0.025em]">
        {t.guides.title}
      </h2>
      <div className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {guides.map((_, index) => (
          <article
            className="flex min-h-[128px] flex-col border-b border-[#e5e7eb] py-4"
            key={t.guides.items[index].title}
          >
            <h3 className="text-sm font-semibold leading-5">
              {t.guides.items[index].title}
            </h3>
            <p className="mt-2 text-[11px] leading-[1.65] text-[#697281]">
              {t.guides.items[index].description}
            </p>
            <a
              className="mt-auto pt-3 text-[11px] font-semibold text-[#0071e3]"
              href={`${locale === "zh" ? "/zh" : ""}/blog/${guideSlugs[index]}`}
            >
              {t.guides.read} <span className="ml-1">→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

function localizeMonthlyPrice(price: string, locale: "en" | "zh") {
  if (locale === "en") {
    return price;
  }

  const isStartingPrice = price.startsWith("from ");
  const localizedPrice = price.replace("from ", "").replace("/mo", "/月");
  return isStartingPrice ? `${localizedPrice}起` : localizedPrice;
}
