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
import { useLanguage } from "./language-provider";

const homeFinderCopy = {
  en: {
    title: "Find your lowest-price plan",
    description:
      "Choose AI tools to see currently available lowest-price strategies.",
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

const imageLogoMap: Record<string, string> = {
  chatgpt: "/ai-icons/ChatGPT.png",
  grok: "/ai-icons/Grok.png",
  claude: "/ai-icons/Claude.png",
};

const imageLogoSizeMap: Record<string, string> = {
  chatgpt: "h-7 w-7",
  grok: "h-7 w-7",
  claude: "h-7 w-7",
};

export function HomeFinderSection() {
  const { locale } = useLanguage();
  const copy = homeFinderCopy[locale];

  const [selectedToolId, setSelectedToolId] =
    useState<FinderTool["id"]>("chatgpt-plus");

  const [preferenceId, setPreferenceId] =
    useState<FinderPreferenceId>("lowest");

  const selectedTool = useMemo(
    () => finderTools.find((tool) => tool.id === selectedToolId) ?? finderTools[0],
    [selectedToolId],
  );

  const summary = useMemo(() => getSummary(selectedTool), [selectedTool]);

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-10 pt-4 sm:px-5 lg:px-6">
      <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
          <ToolPicker
            copy={copy}
            locale={locale}
            selectedToolId={selectedToolId}
            onSelectTool={setSelectedToolId}
          />

          <PreferencePicker
            locale={locale}
            preferenceId={preferenceId}
            onPreferenceChange={setPreferenceId}
          />
        </div>

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

      <RiskHint copy={copy} />
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
      <h3 className="text-sm font-bold text-slate-950">{copy.chooseTitle}</h3>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {finderTools.map((tool) => {
          const selected = selectedToolId === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              type="button"
              className={[
                "relative flex min-h-[58px] items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition",
                selected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300",
              ].join(" ")}
            >
              {selected && (
                <span className="absolute right-2.5 top-2.5 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  ✓
                </span>
              )}

              <ToolLogo tool={tool} />

              <div className="min-w-0">
                <h4 className="truncate text-sm font-bold text-slate-950">
                  {tool.name}
                </h4>
                <p className="mt-0.5 text-xs text-slate-500">
                  {copy.officialPrice}{" "}
                  {formatMonthly(tool.officialPriceMonthlyUsd, locale)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ToolLogo({ tool }: { tool: FinderTool }) {
  if (tool.iconName === "gemini") {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center">
        <GeminiLogo />
      </span>
    );
  }

  const logoSrc = imageLogoMap[tool.iconName];
  const logoClass = imageLogoSizeMap[tool.iconName] ?? "h-7 w-7";

  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-visible">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`${tool.name} logo`}
          className={`${logoClass} object-contain`}
        />
      ) : (
        <span className="text-xs font-bold text-slate-700">{tool.mark}</span>
      )}
    </span>
  );
}

function GeminiLogo() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-7 w-7"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M32 4C36.2 20.1 43.9 27.8 60 32C43.9 36.2 36.2 43.9 32 60C27.8 43.9 20.1 36.2 4 32C20.1 27.8 27.8 20.1 32 4Z"
        fill="#5B8CFF"
      />
    </svg>
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
    <div className="mt-5">
      <h3 className="text-sm font-bold text-slate-950">
        {homeFinderCopy[locale].preferenceTitle}
      </h3>

      <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
        {finderPreferences.map((preference) => {
          const selected = preference.id === preferenceId;

          return (
            <button
              key={preference.id}
              onClick={() => onPreferenceChange(preference.id)}
              type="button"
              className={[
                "rounded-xl border px-3 py-3 text-left transition",
                selected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300",
              ].join(" ")}
            >
              <div className="text-sm font-bold text-slate-950">
                {preference.title[locale]}
              </div>
              <div className="mt-1.5 text-xs text-slate-500">
                {preference.description[locale]}
              </div>
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
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-bold text-slate-950">{title}</h3>

      <div className="mt-4 space-y-2">
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
      </div>

      <div className="mt-4 rounded-xl bg-emerald-50 p-3">
        <div className="text-xs font-bold text-emerald-700">
          {copy.yearlySaving}
        </div>
        <div className="mt-1 text-2xl font-black text-emerald-600">
          {formatYearly(summary.yearlySaving, locale)}
        </div>
      </div>

      <a
        href="#recommended-platforms"
        className="mt-4 inline-flex rounded-lg border border-blue-500 px-3 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50"
      >
        {copy.viewRecommendedPlatforms}
      </a>
    </div>
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
      <div className="flex items-center justify-between rounded-xl bg-blue-50 px-3 py-2">
        <span className="text-xs text-slate-500">{label}</span>
        <span className="text-sm font-black text-blue-600">{value}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2 last:border-b-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span
        className={[
          "text-sm font-bold",
          green ? "text-emerald-600" : "text-slate-950",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
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
    <div id="recommended-platforms" className="mt-7">
      <h3 className="text-xl font-black text-slate-950">
        {selectedTool.name} {copy.recommendationsTitle}
      </h3>

      <p className="mt-1.5 text-xs text-slate-500">
        {locale === "zh"
          ? `比较 ${selectedTool.name} 当前可用平台的价格、可用性和风险提示。`
          : `${copy.recommendationsDescription} ${selectedTool.name}.`}
      </p>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {sortedPlans.map((plan) => (
          <PlanCard key={plan.id} copy={copy} locale={locale} plan={plan} />
        ))}
      </div>
    </div>
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
    <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
      <h4 className="text-sm font-black text-slate-950">
        {isOfficial ? copy.officialPlan : plan.platformName}
      </h4>

      <div className="mt-4 text-3xl font-black text-slate-950">
        {formatMonthly(plan.monthlyPriceUsd, locale, !isOfficial)}
      </div>

      <div className="mt-2.5">
        <span
          className={[
            "inline-flex rounded-full px-2.5 py-1 text-xs font-bold",
            isOfficial
              ? "bg-slate-100 text-slate-500"
              : "bg-emerald-50 text-emerald-600",
          ].join(" ")}
        >
          {isOfficial
            ? copy.lowestRisk
            : `${copy.savingLine} ${formatSavingPercent(plan.savingPercent)}`}
        </span>
      </div>

      <div className="my-5 h-px bg-slate-100" />

      <div className="space-y-3">
        <PlanRow label={copy.availability} value={plan.availability[locale]} />
        <PlanRow label={copy.riskNote} value={plan.riskNote[locale]} />
        <PlanRow label={copy.bestFor} value={plan.suitableFor[locale]} />
      </div>

      <a
        href={plan.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 flex w-full items-center justify-center rounded-lg bg-blue-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700"
      >
        {plan.ctaLabel[locale]}
      </a>
    </div>
  );
}

function PlanRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-right text-xs font-bold text-slate-950">
        {value}
      </span>
    </div>
  );
}

function RiskHint({ copy }: { copy: Record<string, string> }) {
  return (
    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-500">
      <h3 className="font-bold text-slate-950">{copy.riskTitle}</h3>
      <p className="mt-1.5 leading-5">{copy.riskDescription}</p>
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
