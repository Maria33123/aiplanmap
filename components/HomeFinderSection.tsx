"use client";

import {
  finderPreferences,
  finderTools,
  type FinderPlan,
  type FinderPreferenceId,
  type FinderTool,
} from "@/lib/finder-data";
import type { Locale } from "@/lib/i18n";
import { useMemo, useState } from "react";
import { Icon } from "./icons";
import { useLanguage } from "./language-provider";

const homeFinderCopy = {
  en: {
    title: "Find your lowest-price plan",
    description: "Choose AI tools to see currently available lowest-price strategies.",
    chooseTitle: "AI tools",
    officialPrice: "Official",
    preferenceTitle: "Finder preference",
    summarySingleSuffix: "lowest-price strategy",
    officialCost: "Official cost",
    lowestStrategy: "Lowest platform",
    monthlySaving: "Estimated monthly saving",
    yearlySaving: "Estimated yearly saving",
    viewRecommendedPlatforms: "View recommended platforms",
    recommendationsTitle: "Recommended platforms",
    recommendationsDescription: "Compare available platform options for",
    officialPriceLine: "Official price",
    lowestPlanLine: "Lowest platform",
    savingLine: "Estimated saving",
    price: "Price",
    availability: "Availability",
    riskNote: "Risk note",
    bestFor: "Best for",
    officialPlan: "Official Plan",
    lowestRisk: "Lowest risk",
    riskTitle: "Before you choose",
    riskDescription:
      "Shared subscription platforms may involve account availability, refunds, access stability, and platform policy changes. AI Plan Map does not sell accounts or process payments. Please review each platform’s own terms before making a decision.",
  },
  zh: {
    title: "查找你的最低价方案",
    description: "选择 AI 工具，查看当前可用的最低价策略。",
    chooseTitle: "AI 工具",
    officialPrice: "官方价",
    preferenceTitle: "查找偏好",
    summarySingleSuffix: "最低价策略",
    officialCost: "官方费用",
    lowestStrategy: "最低平台",
    monthlySaving: "预计每月节省",
    yearlySaving: "预计每年节省",
    viewRecommendedPlatforms: "查看推荐平台",
    recommendationsTitle: "推荐平台",
    recommendationsDescription:
      "根据当前选择的 AI 工具，比较可用平台的价格、可用性和风险提示。",
    officialPriceLine: "官方价格",
    lowestPlanLine: "最低平台",
    savingLine: "预计节省",
    price: "价格",
    availability: "可用性",
    riskNote: "风险提示",
    bestFor: "适合人群",
    officialPlan: "官方方案",
    lowestRisk: "风险最低",
    riskTitle: "选择前请注意",
    riskDescription:
      "价格不是唯一因素。共享订阅平台可能涉及账号可用性、退款、访问稳定性和平台政策变化等风险。AI Plan Map 不销售账号，也不处理付款。请选择前查看每个平台自己的服务条款、价格和退款规则。",
  },
} satisfies Record<Locale, Record<string, string>>;

export function HomeFinderSection() {
  const { locale } = useLanguage();
  const copy = homeFinderCopy[locale];
  const [selectedToolId, setSelectedToolId] =
    useState<FinderTool["id"]>("chatgpt-plus");
  const [preferenceId, setPreferenceId] = useState<FinderPreferenceId>("lowest");

  const selectedTool = useMemo(
    () => finderTools.find((tool) => tool.id === selectedToolId) ?? finderTools[0],
    [selectedToolId],
  );
  const summary = useMemo(() => getSummary(selectedTool), [selectedTool]);

  const selectTool = (toolId: FinderTool["id"]) => {
    setSelectedToolId(toolId);
  };

  return (
    <section className="page-shell mt-5 scroll-mt-8 md:mt-6" id="finder">
      <div className="grid gap-5 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
        <section className="surface rounded-[24px] p-4 md:p-5">
          <ToolPicker
            copy={copy}
            locale={locale}
            selectedToolId={selectedToolId}
            onSelectTool={selectTool}
          />
          <PreferencePicker
            locale={locale}
            preferenceId={preferenceId}
            onPreferenceChange={setPreferenceId}
          />
        </section>

        <SummaryCard
          copy={copy}
          locale={locale}
          selectedTool={selectedTool}
          summary={summary}
        />
      </div>

      <RecommendationList
        copy={copy}
        locale={locale}
        preferenceId={preferenceId}
        selectedTool={selectedTool}
      />
    </section>
  );
}

function ToolPicker({
  copy,
  locale,
  selectedToolId,
  onSelectTool,
}: {
  copy: Record<string, string>;
  locale: Locale;
  selectedToolId: FinderTool["id"];
  onSelectTool: (toolId: FinderTool["id"]) => void;
}) {
  return (
    <div>
      <h3 className="text-base font-semibold">{copy.chooseTitle}</h3>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {finderTools.map((tool) => {
          const selected = selectedToolId === tool.id;

          return (
            <button
              className={`relative rounded-2xl border p-3 text-left transition ${
                selected
                  ? "border-[#0071e3] bg-[#eef6ff]"
                  : "border-[#e5e7eb] bg-white/70 hover:border-[#bfdbfe] hover:bg-white"
              }`}
              data-testid={`home-finder-tool-${tool.id}`}
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              type="button"
            >
              {selected && (
                <span className="absolute right-3 top-3 grid h-4 w-4 place-items-center rounded-full bg-[#0071e3] text-[10px] font-bold text-white">
                  ✓
                </span>
              )}
              <div className="flex items-center gap-3 pr-5">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-xl text-xs font-bold ${tool.accentClass}`}
                >
                  {tool.mark}
                </span>
                <div>
                  <h4 className="text-sm font-semibold">{tool.name}</h4>
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
      <h3 className="text-base font-semibold">{homeFinderCopy[locale].preferenceTitle}</h3>
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
              data-testid={`home-finder-preference-${preference.id}`}
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
  selectedTool,
  summary,
}: {
  copy: Record<string, string>;
  locale: Locale;
  selectedTool: FinderTool;
  summary: FinderSummary;
}) {
  const title = `${selectedTool.name} ${copy.summarySingleSuffix}`;

  return (
    <aside className="surface rounded-[24px] p-5">
      <p className="text-base font-semibold">{title}</p>
      <div className="mt-4 space-y-3 text-sm">
        <SummaryRow
          label={copy.lowestStrategy}
          value={formatMonthly(summary.lowestCost, locale, true)}
          highlighted
        />
        <SummaryRow
          label={copy.officialCost}
          value={formatMonthly(summary.officialCost, locale)}
        />
        <SummaryRow
          label={copy.monthlySaving}
          value={formatMonthly(summary.monthlySaving, locale)}
          green
        />
        <div className="rounded-2xl border border-[#e8f3ed] bg-[#f8fbf9] p-4">
          <span className="text-xs font-medium text-[#04733b]">
            {copy.yearlySaving}
          </span>
          <strong className="mt-1 block text-[26px] leading-none text-[#079447]">
            {formatYearly(summary.yearlySaving, locale)}
          </strong>
        </div>
      </div>
      <a
        className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0071e3] bg-white px-4 py-2 text-[12px] font-semibold text-[#0071e3] transition hover:bg-[#f0f7ff]"
        href="#recommended-platforms"
      >
        {copy.viewRecommendedPlatforms}
      </a>
    </aside>
  );
}

function SummaryRow({
  label,
  value,
  green = false,
  highlighted = false,
}: {
  label: string;
  value: string;
  green?: boolean;
  highlighted?: boolean;
}) {
  if (highlighted) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#dcecff] bg-[#f5f9ff] p-4">
        <span className="font-medium text-[#4b6480]">{label}</span>
        <strong className="text-lg tracking-[-0.02em] text-[#006bd6]">
          {value}
        </strong>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#edf0f3] pb-3 last:border-b-0">
      <span className="text-[#6b7280]">{label}</span>
      <strong className={`text-base ${green ? "text-[#079447]" : "text-[#111111]"}`}>
        {value}
      </strong>
    </div>
  );
}

function RiskHint({ copy }: { copy: Record<string, string> }) {
  return (
    <section className="mt-5 rounded-[20px] border border-[#e5e7eb] bg-[#f7f8fa] p-4">
      <div className="flex gap-4">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-[#e5e7eb] bg-white text-[#758396]">
          <Icon name="shield" className="h-4 w-4" />
        </span>
        <div>
          <h3 className="text-sm font-semibold">{copy.riskTitle}</h3>
          <p className="mt-1.5 text-[12px] leading-5 text-[#667382]">
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
  selectedTool,
}: {
  copy: Record<string, string>;
  locale: Locale;
  preferenceId: FinderPreferenceId;
  selectedTool: FinderTool;
}) {
  const sortedPlans = getSortedPlans(selectedTool.plans, preferenceId);

  return (
    <section className="mt-4 scroll-mt-8 pb-3 md:mt-5" id="recommended-platforms">
      <h3 className="text-xl font-semibold tracking-[-0.025em] md:text-2xl">
        {selectedTool.name} {copy.recommendationsTitle}
      </h3>
      <p className="mt-2 max-w-[760px] text-sm leading-6 text-[#6b7280]">
        {locale === "zh"
          ? `比较 ${selectedTool.name} 当前可用平台的价格、可用性和风险提示。`
          : `${copy.recommendationsDescription} ${selectedTool.name}.`}
      </p>

      <div className="mt-4 grid items-stretch gap-4 lg:grid-cols-3">
        {sortedPlans.map((plan) => (
          <PlanCard copy={copy} key={plan.id} locale={locale} plan={plan} />
        ))}
      </div>

      <RiskHint copy={copy} />
    </section>
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
    <div className="flex h-full flex-col rounded-[22px] border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_24px_rgba(17,24,39,0.025)]">
      <h5 className="text-sm font-semibold text-[#111111]">
        {isOfficial ? copy.officialPlan : plan.platformName}
      </h5>

      <strong className="mt-4 block text-[28px] leading-none tracking-[-0.035em] text-[#111111]">
        {formatMonthly(plan.monthlyPriceUsd, locale, !isOfficial)}
      </strong>

      <span
        className={`mt-3 w-fit rounded-full px-2.5 py-1 text-[11px] font-semibold ${
          isOfficial
            ? "bg-[#f2f4f7] text-[#526071]"
            : "bg-[#edf8f1] text-[#087a43]"
        }`}
      >
        {isOfficial
          ? copy.lowestRisk
          : `${copy.savingLine} ${formatSavingPercent(plan.savingPercent)}`}
      </span>

      <dl className="mt-5 space-y-2.5 border-t border-[#edf0f3] pt-4 text-[12px]">
        <PlanRow label={copy.availability} value={plan.availability[locale]} />
        <PlanRow label={copy.riskNote} value={plan.riskNote[locale]} />
        <PlanRow label={copy.bestFor} value={plan.suitableFor[locale]} />
      </dl>

      <div className="mt-auto pt-6">
        <a
          className={`block rounded-xl px-4 py-2.5 text-center text-[12px] font-semibold transition ${
            isOfficial
              ? "border border-[#d8dee6] bg-white text-[#374151] hover:border-[#aebbc9] hover:bg-[#fafbfc]"
              : "blue-button text-white"
          }`}
          href={plan.externalUrl}
        >
          {plan.ctaLabel[locale]}
        </a>
      </div>
    </div>
  );
}

function PlanRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-[#6b7280]">{label}</dt>
      <dd className="text-right font-medium text-[#303642]">{value}</dd>
    </div>
  );
}

type FinderSummary = {
  officialCost: number;
  lowestCost: number;
  monthlySaving: number;
  yearlySaving: number;
};

function getSummary(tool: FinderTool): FinderSummary {
  const officialCost = tool.officialPriceMonthlyUsd;
  const lowestCost = getBestPlan(tool).monthlyPriceUsd;
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
