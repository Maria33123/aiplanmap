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
    <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.65fr_1fr]">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
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
      <h3 className="text-base font-bold text-slate-950">{copy.chooseTitle}</h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {finderTools.map((tool) => {
          const selected = selectedToolId === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              type="button"
              className={[
                "relative flex items-center gap-4 rounded-2xl border p-4 text-left transition",
                selected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300",
              ].join(" ")}
            >
              {selected && (
                <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                  ✓
                </span>
              )}

              <ToolLogo tool={tool} />

              <div>
                <h4 className="font-bold text-slate-950">{tool.name}</h4>
                <p className="mt-1 text-sm text-slate-500">
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
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <GeminiLogo />
      </span>
    );
  }

  if (tool.iconName === "claude") {
    return (
      <span className="flex h-14 w-14 shrink-0 items-center justify-center">
        <ClaudeLogo />
      </span>
    );
  }

  const logoSrc = imageLogoMap[tool.iconName];

  return (
    <span className="flex h-14 w-14 shrink-0 items-center justify-center">
      {logoSrc ? (
        <img
          src={logoSrc}
          alt={`${tool.name} logo`}
          className="h-11 w-11 object-contain"
        />
      ) : (
        <span className="text-sm font-bold text-slate-700">{tool.mark}</span>
      )}
    </span>
  );
}

function GeminiLogo() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-11 w-11"
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

function ClaudeLogo() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-10 w-10"
      aria-hidden="true"
      focusable="false"
    >
      <g
        stroke="#FF6A3D"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      >
        <line x1="32" y1="8" x2="32" y2="56" />
        <line x1="8" y1="32" x2="56" y2="32" />
        <line x1="15" y1="15" x2="49" y2="49" />
        <line x1="49" y1="15" x2="15" y2="49" />
        <line x1="22" y1="10" x2="42" y2="54" />
        <line x1="42" y1="10" x2="22" y2="54" />
        <line x1="10" y1="22" x2="54" y2="42" />
        <line x1="54" y1="22" x2="10" y2="42" />
      </g>
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
    <div className="mt-6">
      <h3 className="text-base font-bold text-slate-950">
        {homeFinderCopy[locale].preferenceTitle}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {finderPreferences.map((preference) => {
          const selected = preference.id === preferenceId;

          return (
            <button
              key={preference.id}
              onClick={() => onPreferenceChange(preference.id)}
              type="button"
              className={[
                "rounded-2xl border p-4 text-left transition",
                selected
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-white hover:border-blue-300",
              ].join(" ")}
            >
              <div className="font-bold text-slate-950">
                {preference.title[locale]}
              </div>
              <div className="mt-2 text-sm text-slate-500">
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
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-bold text-slate-950">{title}</h3>

      <div className="mt-5 space-y-3">
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

      <div className="mt-5 rounded-2xl bg-emerald-50 p-4">
        <div className="text-sm font-bold text-emerald-700">
          {copy.yearlySaving}
        </div>
        <div className="mt-1 text-3xl font-black text-emerald-600">
          {formatYearly(summary.yearlySaving, locale)}
        </div>
      </div>

      <a
        href="#recommended-platforms"
        className="mt-5 inline-flex rounded-xl border border-blue-500 px-4 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50"
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
      <div className="flex items-center justify-between rounded-2xl bg-blue-50 px-4 py-3">
        <span className="text-sm text-slate-500">{label}</span>
        <span className="font-black text-blue-600">{value}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-3 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span
        className={[
          "font-bold",
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
    <div id="recommended-platforms" className="mt-8">
      <h3 className="text-2xl font-black text-slate-950">
        {selectedTool.name} {copy.recommendationsTitle}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {locale === "zh"
          ? `比较 ${selectedTool.name} 当前可用平台的价格、可用性和风险提示。`
          : `${copy.recommendationsDescription} ${selectedTool.name}.`}
      </p>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
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
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <h4 className="font-black text-slate-950">
        {isOfficial ? copy.officialPlan : plan.platformName}
      </h4>

      <div className="mt-5 text-4xl font-black text-slate-950">
        {formatMonthly(plan.monthlyPriceUsd, locale, !isOfficial)}
      </div>

      <div className="mt-3">
        <span
          className={[
            "inline-flex rounded-full px-3 py-1 text-sm font-bold",
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

      <div className="my-6 h-px bg-slate-100" />

      <div className="space-y-4">
        <PlanRow label={copy.availability} value={plan.availability[locale]} />
        <PlanRow label={copy.riskNote} value={plan.riskNote[locale]} />
        <PlanRow label={copy.bestFor} value={plan.suitableFor[locale]} />
      </div>

      <a
        href={plan.externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={[
          "mt-6 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold transition",
          isOfficial
            ? "border border-slate-200 text-slate-700 hover:bg-slate-50"
            : "bg-blue-600 text-white hover:bg-blue-700",
        ].join(" ")}
      >
        {plan.ctaLabel[locale]}
      </a>
    </div>
  );
}

function PlanRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-right text-sm font-bold text-slate-950">
        {value}
      </span>
    </div>
  );
}

function RiskHint({ copy }: { copy: Record<string, string> }) {
  return (
    <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-500">
      <h3 className="font-bold text-slate-950">{copy.riskTitle}</h3>
      <p className="mt-2 leading-6">{copy.riskDescription}</p>
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
