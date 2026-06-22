"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider, useLanguage } from "@/components/language-provider";
import {
  finderFaqs,
  finderPlatformNotes,
  finderPreferences,
  finderTools,
  type FinderPlan,
  type FinderPreferenceId,
  type FinderTool,
} from "@/lib/finder-data";
import type { Locale } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { Icon } from "./icons";

const finderMeta = {
  en: {
    title: "AI Price Guide - Finder",
    description:
      "Choose AI tools and compare official plans, shared-platform prices, estimated savings and risk notes.",
  },
  zh: {
    title: "AI Price Guide - 方案查找",
    description: "选择 AI 工具和偏好，查看当前可用的最低价策略。",
  },
};

const finderCopy = {
  en: {
    pageTitle: "Finder",
    pageDescription:
      "Choose AI tools to see currently available lowest-price strategies.",
    updatedBadge: "Price data updated daily",
    chooseTitle: "Which AI tools do you want to find lower prices for?",
    officialPrice: "Official price",
    preferenceTitle: "Finder preference",
    searchButton: "View recommended platforms",
    disclaimer: "Review each platform's notes before deciding.",
    summaryTitle: "Results summary",
    summarySingleSuffix: "lowest-price strategy",
    summaryMultiPrefix: "Selected",
    selected: "Selected",
    officialCost: "Official cost",
    lowestStrategy: "Lowest platform",
    monthlySaving: "Estimated monthly saving",
    yearlySaving: "Estimated yearly saving",
    tools: "tools",
    emptyResultsTitle: "Recommended platforms will appear here",
    emptyResultsDescription:
      "Choose tools, confirm your preference, then click the button to show platform options.",
    riskTitle: "Price is not the only factor.",
    riskDescription:
      "Shared subscription platforms may involve account availability, refund, access stability and platform policy risks. Review each platform before deciding.",
    recommendationsTitle: "Recommended platforms",
    recommendationsDescription:
      "Sorted by your selection and preference. Review price, availability and risk notes together.",
    officialPriceLine: "Official price",
    lowestPlanLine: "Lowest platform",
    savingLine: "Estimated saving",
    price: "Price",
    availability: "Availability",
    riskNote: "Risk note",
    bestFor: "Best for",
    platformCta: "View Platform Plan",
    officialCta: "View Official Plan",
    platformNotesTitle: "Platform notes",
    faqTitle: "FAQ",
  },
  zh: {
    pageTitle: "方案查找",
    pageDescription: "选择 AI 工具，查看当前可用的最低价策略。",
    updatedBadge: "价格数据每日更新",
    chooseTitle: "你想为哪些 AI 工具找最低价？",
    officialPrice: "官方价格",
    preferenceTitle: "查找偏好",
    searchButton: "查看推荐平台",
    disclaimer: "选择前请查看每个平台说明。",
    summaryTitle: "结果摘要",
    summarySingleSuffix: "最低价策略",
    summaryMultiPrefix: "已选",
    selected: "已选择",
    officialCost: "官方费用",
    lowestStrategy: "最低平台",
    monthlySaving: "预计每月节省",
    yearlySaving: "预计每年节省",
    tools: "个工具",
    emptyResultsTitle: "推荐平台将在这里显示",
    emptyResultsDescription: "选择工具和偏好后，点击按钮即可查看平台列表。",
    riskTitle: "价格不是唯一因素。",
    riskDescription:
      "共享订阅平台可能涉及账号可用性、退款、访问稳定性和平台政策变化等风险。请在选择前查看每个平台说明。",
    recommendationsTitle: "推荐平台",
    recommendationsDescription: "根据你的选择和偏好排序。请同时查看价格、可用性和风险提示。",
    officialPriceLine: "官方价格",
    lowestPlanLine: "最低平台",
    savingLine: "预计节省",
    price: "价格",
    availability: "可用性",
    riskNote: "风险提示",
    bestFor: "适合",
    platformCta: "查看平台方案",
    officialCta: "查看官方方案",
    platformNotesTitle: "平台说明",
    faqTitle: "常见问题",
  },
} satisfies Record<Locale, Record<string, string>>;

export function FinderPage({ initialLocale }: { initialLocale: Locale }) {
  return (
    <LanguageProvider initialLocale={initialLocale} metaByLocale={finderMeta}>
      <FinderContent />
    </LanguageProvider>
  );
}

function FinderContent() {
  const { locale } = useLanguage();
  const copy = finderCopy[locale];
  const [selectedToolIds, setSelectedToolIds] = useState<Array<FinderTool["id"]>>([
    "chatgpt-plus",
  ]);
  const [preferenceId, setPreferenceId] = useState<FinderPreferenceId>("balanced");

  const selectedTools = useMemo(
    () => finderTools.filter((tool) => selectedToolIds.includes(tool.id)),
    [selectedToolIds],
  );

  const summary = useMemo(() => getSummary(selectedTools), [selectedTools]);

  const toggleTool = (toolId: FinderTool["id"]) => {
    setSelectedToolIds((current) => {
      if (!current.includes(toolId)) {
        return [...current, toolId];
      }

      if (current.length === 1) {
        return current;
      }

      return current.filter((id) => id !== toolId);
    });
  };

  return (
    <main className="min-h-screen overflow-hidden">
      <Header />

      <section className="page-shell pb-9 pt-6 md:pt-8">
        <div className="flex flex-col gap-4 border-b border-[#e5e7eb] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-[32px] font-semibold tracking-[-0.045em] md:text-[38px]">
              {copy.pageTitle}
            </h1>
            <p className="mt-3 max-w-[620px] text-sm leading-6 text-[#6b7280]">
              {copy.pageDescription}
            </p>
          </div>
          <span className="w-fit rounded-full border border-[#dbe7f8] bg-[#eef6ff] px-3.5 py-2 text-[11px] font-semibold text-[#0071e3]">
            {copy.updatedBadge}
          </span>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
          <section className="surface rounded-[26px] p-4 md:p-5">
            <ToolPicker
              copy={copy}
              locale={locale}
              selectedToolIds={selectedToolIds}
              onToggleTool={toggleTool}
            />
            <PreferencePicker
              locale={locale}
              preferenceId={preferenceId}
              onPreferenceChange={setPreferenceId}
            />
            <a
              className="blue-button mt-6 block w-full rounded-2xl px-5 py-3.5 text-center text-sm font-semibold text-white transition"
              data-testid="finder-search-button"
              href="#recommendations"
            >
              {copy.searchButton}
            </a>
            <p className="mt-3 text-center text-[11px] leading-5 text-[#6b7280]">
              {copy.disclaimer}
            </p>
          </section>

          <SummaryCard
            copy={copy}
            locale={locale}
            selectedTools={selectedTools}
            summary={summary}
          />
        </div>

        <RiskHint copy={copy} />

        <RecommendationList
          copy={copy}
          locale={locale}
          preferenceId={preferenceId}
          selectedTools={selectedTools}
        />

        <PlatformNotes locale={locale} title={copy.platformNotesTitle} />
        <FaqSection locale={locale} title={copy.faqTitle} />
      </section>

      <Footer />
    </main>
  );
}

function ToolPicker({
  copy,
  locale,
  selectedToolIds,
  onToggleTool,
}: {
  copy: Record<string, string>;
  locale: Locale;
  selectedToolIds: Array<FinderTool["id"]>;
  onToggleTool: (toolId: FinderTool["id"]) => void;
}) {
  return (
    <div>
      <h2 className="text-base font-semibold">{copy.chooseTitle}</h2>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {finderTools.map((tool) => {
          const selected = selectedToolIds.includes(tool.id);

          return (
            <button
              className={`relative rounded-2xl border p-3 text-left transition ${
                selected
                  ? "border-[#0071e3] bg-[#eef6ff]"
                  : "border-[#e5e7eb] bg-white/70 hover:border-[#bfdbfe] hover:bg-white"
              }`}
              data-testid={`finder-tool-${tool.id}`}
              key={tool.id}
              onClick={() => onToggleTool(tool.id)}
              type="button"
            >
              {selected && (
                <span className="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full bg-[#0071e3] text-[10px] font-bold text-white">
                  ✓
                </span>
              )}
              <div className="flex items-center gap-3 pr-5">
                <span className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-bold ${tool.accentClass}`}>
                  {tool.mark}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{tool.name}</h3>
                  <p className="mt-1 text-[11px] text-[#6b7280]">
                    {copy.officialPrice} {formatMonthly(tool.officialPriceMonthlyUsd, locale)}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PreferencePicker({
  locale,
  preferenceId,
  onPreferenceChange,
}: {
  locale: Locale;
  preferenceId: FinderPreferenceId;
  onPreferenceChange: (preferenceId: FinderPreferenceId) => void;
}) {
  return (
    <div className="mt-6">
      <h2 className="text-base font-semibold">{finderCopy[locale].preferenceTitle}</h2>
      <div className="mt-4 grid gap-2.5 md:grid-cols-3">
        {finderPreferences.map((preference) => {
          const selected = preference.id === preferenceId;

          return (
            <button
              className={`rounded-2xl border p-3 text-left transition ${
                selected
                  ? "border-[#0071e3] bg-[#eef6ff]"
                  : "border-[#e5e7eb] bg-white/70 hover:border-[#bfdbfe] hover:bg-white"
              }`}
              data-testid={`finder-preference-${preference.id}`}
              key={preference.id}
              onClick={() => onPreferenceChange(preference.id)}
              type="button"
            >
              <span className="text-sm font-semibold">{preference.title[locale]}</span>
              <span className="mt-2 block text-[11px] leading-5 text-[#6b7280]">
                {preference.description[locale]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SummaryCard({
  copy,
  locale,
  selectedTools,
  summary,
}: {
  copy: Record<string, string>;
  locale: Locale;
  selectedTools: FinderTool[];
  summary: FinderSummary;
}) {
  const title =
    selectedTools.length === 1
      ? `${selectedTools[0].name} ${copy.summarySingleSuffix}`
      : `${copy.summaryMultiPrefix} ${selectedTools.length} ${copy.tools}`;

  return (
    <aside className="surface soft-shadow rounded-[26px] p-5 lg:sticky lg:top-5">
      <div>
        <p className="text-lg font-semibold">{title}</p>
        <div className="mt-5 space-y-4 text-sm">
          <SummaryRow
            label={copy.officialCost}
            value={formatMonthly(summary.officialCost, locale)}
          />
          <SummaryRow
            label={copy.lowestStrategy}
            value={formatMonthly(summary.lowestCost, locale, true)}
          />
          <SummaryRow
            label={copy.monthlySaving}
            value={formatMonthly(summary.monthlySaving, locale)}
            green
          />
          <div className="rounded-2xl bg-[#f6fbf8] p-4">
            <span className="text-xs font-medium text-[#04733b]">
              {copy.yearlySaving}
            </span>
            <strong className="mt-1 block text-[30px] leading-none text-[#079447]">
              {formatYearly(summary.yearlySaving, locale)}
            </strong>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#edf0f3] pb-4 last:border-b-0">
      <span className="text-[#6b7280]">{label}</span>
      <strong className={`text-lg ${green ? "text-[#079447]" : "text-[#111111]"}`}>
        {value}
      </strong>
    </div>
  );
}

function RiskHint({ copy }: { copy: Record<string, string> }) {
  return (
    <section className="mt-6 rounded-[24px] border border-[#dfeaf7] bg-[#f4f9ff] p-4">
      <div className="flex gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-white text-[#0071e3] shadow-sm">
          <Icon name="shield" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-sm font-semibold">{copy.riskTitle}</h2>
          <p className="mt-2 text-[13px] leading-6 text-[#5f6b7a]">
            {copy.riskDescription}
          </p>
        </div>
      </div>
    </section>
  );
}

function RecommendationList({
  copy,
  locale,
  preferenceId,
  selectedTools,
}: {
  copy: Record<string, string>;
  locale: Locale;
  preferenceId: FinderPreferenceId;
  selectedTools: FinderTool[];
}) {
  return (
    <section className="mt-7 scroll-mt-8" id="recommendations">
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">
        {copy.recommendationsTitle}
      </h2>
      <p className="mt-2 max-w-[680px] text-sm leading-6 text-[#6b7280]">
        {copy.recommendationsDescription}
      </p>
      <div className="mt-5 space-y-5">
        {selectedTools.map((tool) => (
          <ToolRecommendation
            copy={copy}
            key={tool.id}
            locale={locale}
            preferenceId={preferenceId}
            tool={tool}
          />
        ))}
      </div>
    </section>
  );
}

function ToolRecommendation({
  copy,
  locale,
  preferenceId,
  tool,
}: {
  copy: Record<string, string>;
  locale: Locale;
  preferenceId: FinderPreferenceId;
  tool: FinderTool;
}) {
  const bestPlan = getBestPlan(tool);
  const sortedPlans = getSortedPlans(tool.plans, preferenceId);

  return (
    <article className="surface rounded-[26px] p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold">{tool.name}</h3>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#6b7280]">
            <span>
              {copy.officialPriceLine}{" "}
              <strong className="text-[#111111]">
                {formatMonthly(tool.officialPriceMonthlyUsd, locale)}
              </strong>
            </span>
            <span>
              {copy.lowestPlanLine}{" "}
              <strong className="text-[#111111]">
                {formatMonthly(bestPlan.monthlyPriceUsd, locale, true)}
              </strong>
            </span>
            <span>
              {copy.savingLine}{" "}
              <strong className="text-[#079447]">
                {formatSavingPercent(bestPlan.savingPercent)}
              </strong>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {sortedPlans.map((plan) => (
          <PlanCard copy={copy} key={plan.id} locale={locale} plan={plan} />
        ))}
      </div>
    </article>
  );
}

function PlanCard({
  copy,
  locale,
  plan,
}: {
  copy: Record<string, string>;
  locale: Locale;
  plan: FinderPlan;
}) {
  const isOfficial = plan.planType === "official";

  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-white/72 p-4">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold">{plan.platformName}</h4>
        {isOfficial && (
          <span className="rounded-full bg-[#f5f7f9] px-2.5 py-1 text-[10px] font-medium text-[#4b5563]">
            Official
          </span>
        )}
      </div>
      <dl className="mt-4 space-y-3 text-[12px]">
        <PlanRow
          label={copy.price}
          value={formatMonthly(plan.monthlyPriceUsd, locale, !isOfficial)}
        />
        <PlanRow
          green
          label={copy.savingLine}
          value={formatSavingPercent(plan.savingPercent)}
        />
        <PlanRow label={copy.availability} value={plan.availability[locale]} />
        <PlanRow label={copy.riskNote} value={plan.riskNote[locale]} />
        <PlanRow label={copy.bestFor} value={plan.suitableFor[locale]} />
      </dl>
      <a
        className={`mt-4 block rounded-xl px-4 py-2.5 text-center text-[12px] font-semibold transition ${
          isOfficial
            ? "border border-[#d8dee6] bg-white text-[#374151] hover:border-[#bfc9d5]"
            : "blue-button text-white"
        }`}
        href={plan.externalUrl}
      >
        {plan.ctaLabel[locale]}
      </a>
    </div>
  );
}

function PlanRow({
  label,
  value,
  green = false,
}: {
  label: string;
  value: string;
  green?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-[#6b7280]">{label}</dt>
      <dd className={`text-right font-semibold ${green ? "text-[#079447]" : "text-[#111111]"}`}>
        {value}
      </dd>
    </div>
  );
}

function PlatformNotes({ locale, title }: { locale: Locale; title: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {finderPlatformNotes.map((platform) => (
          <article className="surface rounded-2xl p-4" key={platform.platformId}>
            <h3 className="text-sm font-semibold">{platform.name}</h3>
            <p className="mt-3 text-[12px] leading-5 text-[#6b7280]">
              {platform.description[locale]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FaqSection({ locale, title }: { locale: Locale; title: string }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold tracking-[-0.03em]">{title}</h2>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {finderFaqs.map((faq) => (
          <article className="surface rounded-2xl p-4" key={faq.question[locale]}>
            <h3 className="text-sm font-semibold">{faq.question[locale]}</h3>
            <p className="mt-3 text-[12px] leading-6 text-[#6b7280]">
              {faq.answer[locale]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

type FinderSummary = {
  officialCost: number;
  lowestCost: number;
  monthlySaving: number;
  yearlySaving: number;
};

function getSummary(tools: FinderTool[]): FinderSummary {
  const officialCost = tools.reduce(
    (total, tool) => total + tool.officialPriceMonthlyUsd,
    0,
  );
  const lowestCost = tools.reduce(
    (total, tool) => total + getBestPlan(tool).monthlyPriceUsd,
    0,
  );
  const monthlySaving = Math.max(0, officialCost - lowestCost);

  return {
    officialCost,
    lowestCost,
    monthlySaving,
    yearlySaving: monthlySaving * 12,
  };
}

function getBestPlan(tool: FinderTool) {
  return tool.plans.reduce((best, plan) =>
    plan.monthlyPriceUsd < best.monthlyPriceUsd ? plan : best,
  );
}

function getSortedPlans(plans: FinderPlan[], preferenceId: FinderPreferenceId) {
  if (preferenceId === "lowest") {
    return [...plans].sort((a, b) => a.monthlyPriceUsd - b.monthlyPriceUsd);
  }

  if (preferenceId === "safer") {
    return [...plans].sort((a, b) => a.riskRank - b.riskRank);
  }

  return [...plans].sort((a, b) => {
    if (a.planType === "official" && b.planType !== "official") {
      return 1;
    }
    if (a.planType !== "official" && b.planType === "official") {
      return -1;
    }
    return a.monthlyPriceUsd - b.monthlyPriceUsd;
  });
}

function formatSavingPercent(savingPercent: number) {
  return `${savingPercent}%`;
}

function formatMonthly(amount: number, locale: Locale, starting = false) {
  const price = `$${formatAmount(amount)}`;
  if (locale === "zh") {
    return starting ? `${price}/月起` : `${price}/月`;
  }

  return starting ? `from ${price}/mo` : `${price}/mo`;
}

function formatYearly(amount: number, locale: Locale) {
  const price = `$${formatAmount(amount)}`;
  return locale === "zh" ? `${price}/年` : `${price}/year`;
}

function formatAmount(amount: number) {
  return Number.isInteger(amount) ? amount.toString() : amount.toFixed(2);
}
