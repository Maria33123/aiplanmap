import {
  aiTools,
  platforms as mockPlatforms,
  recommendationPlansByToolId,
  type AiToolCategory,
  type AiToolId,
  type ProviderId,
  type RecommendationPlanMock,
} from "./mock-data";
import type { Locale } from "./i18n";

export type LocalizedText = Record<Locale, string>;

export type FinderPreferenceId = "balanced" | "lowest" | "safer";

export type FinderPlan = {
  id: string;
  platformId: ProviderId;
  platformName: string;
  planType: "platform" | "official";
  monthlyPriceUsd: number;
  priceLabel: string;
  savingPercent: number;
  availability: LocalizedText;
  riskNote: LocalizedText;
  suitableFor: LocalizedText;
  ctaLabel: LocalizedText;
  externalUrl: string;
  riskRank: number;
};

export type FinderTool = {
  id: AiToolId;
  name: string;
  shortName: string;
  category: AiToolCategory;
  iconName: string;
  mark: string;
  accentClass: string;
  officialPriceMonthlyUsd: number;
  officialPriceLabel: string;
  bestPriceMonthlyUsd: number;
  bestPriceLabel: string;
  savingPercent: number;
  plans: FinderPlan[];
};

export const finderPreferences: Array<{
  id: FinderPreferenceId;
  title: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: "balanced",
    title: {
      en: "Balanced recommendation",
      zh: "综合推荐",
    },
    description: {
      en: "Balance price, availability and risk.",
      zh: "平衡价格、可用性和风险。",
    },
  },
  {
    id: "lowest",
    title: {
      en: "Lowest price",
      zh: "最低价格",
    },
    description: {
      en: "Prioritize the lowest-price platform.",
      zh: "优先展示价格最低的平台。",
    },
  },
  {
    id: "safer",
    title: {
      en: "Lower risk",
      zh: "风险更低",
    },
    description: {
      en: "Prioritize more conservative options.",
      zh: "优先展示更稳妥的选择。",
    },
  },
];

const availabilityCopy: Record<string, LocalizedText> = {
  High: { en: "High", zh: "高" },
  Medium: { en: "Medium", zh: "中" },
  Always: { en: "Always", zh: "始终可用" },
};

const riskCopy: Record<string, LocalizedText> = {
  Moderate: { en: "Moderate", zh: "中等" },
  Lowest: { en: "Lowest", zh: "最低" },
};

const bestForCopy: Record<string, LocalizedText> = {
  "Lowest-price priority": {
    en: "Lowest-price priority",
    zh: "最低价优先",
  },
  "Sharing transparency": {
    en: "Sharing transparency",
    zh: "共享透明度优先",
  },
  "Flexible shared plans": {
    en: "Flexible shared plans",
    zh: "灵活方案",
  },
  "Account safety first": {
    en: "Account safety first",
    zh: "账号安全优先",
  },
};

const platformDescriptionCopy: Record<ProviderId, LocalizedText> = {
  official: {
    en: "Account safety first, highest price.",
    zh: "账号安全优先，价格最高",
  },
  gamsgo: {
    en: "Clear price advantage, useful for lowest-price priority.",
    zh: "价格优势明显，适合最低价优先",
  },
  spliiit: {
    en: "Higher sharing transparency, useful for group sharing.",
    zh: "共享透明度较高，适合多人共享",
  },
  sharesub: {
    en: "Flexible shared plans, useful as an additional option.",
    zh: "共享方案灵活，可作为补充选择",
  },
};

const ctaCopy: Record<RecommendationPlanMock["ctaLabel"], LocalizedText> = {
  "View Platform Plan": {
    en: "View Platform Plan",
    zh: "查看平台方案",
  },
  "View Official Plan": {
    en: "View Official Plan",
    zh: "查看官方方案",
  },
};

const providerRiskRank: Record<ProviderId, number> = {
  official: 1,
  spliiit: 2,
  sharesub: 2,
  gamsgo: 3,
};

export const finderTools: FinderTool[] = aiTools.map((tool) => ({
  id: tool.id,
  name: tool.name,
  shortName: tool.shortName,
  category: tool.category,
  iconName: tool.iconName,
  mark: tool.mark,
  accentClass: tool.accentClass,
  officialPriceMonthlyUsd: tool.officialPrice,
  officialPriceLabel: tool.officialPriceLabel,
  bestPriceMonthlyUsd: tool.bestPrice,
  bestPriceLabel: tool.bestPriceLabel,
  savingPercent: tool.savingPercent,
  plans: recommendationPlansByToolId[tool.id].map((plan) =>
    toFinderPlan(tool.id, plan),
  ),
}));

export const finderPlatformNotes: Array<{
  platformId: ProviderId;
  name: string;
  description: LocalizedText;
}> = mockPlatforms.map((platform) => ({
  platformId: platform.id,
  name: platform.name,
  description: platformDescriptionCopy[platform.id],
}));

export const finderFaqs: Array<{
  question: LocalizedText;
  answer: LocalizedText;
}> = [
  {
    question: {
      en: "Are shared AI subscriptions safe?",
      zh: "共享 AI 订阅安全吗？",
    },
    answer: {
      en: "Shared subscriptions can involve availability, refund, stability and policy risks. Review each platform's plan details before deciding.",
      zh: "共享订阅平台可能涉及账号可用性、退款、访问稳定性和平台政策变化等风险。选择前请查看每个方案说明。",
    },
  },
  {
    question: {
      en: "Why do prices vary so much between platforms?",
      zh: "为什么不同平台价格差这么多？",
    },
    answer: {
      en: "Different platforms may use different subscription models, sharing rules, inventory and service policies, so the final monthly cost can vary.",
      zh: "不同平台的订阅模式、共享规则、库存和服务政策不同，因此最终月费会有明显差异。",
    },
  },
  {
    question: {
      en: "Is the lowest-price plan always best for me?",
      zh: "最低价方案一定最适合我吗？",
    },
    answer: {
      en: "Not always. Price is only one factor. Availability, platform stability, account risk and your usage pattern should be considered together.",
      zh: "不一定。价格只是因素之一，还需要综合考虑可用性、平台稳定性、账号风险和你的使用频率。",
    },
  },
  {
    question: {
      en: "Does AI Price Guide handle payments or accounts?",
      zh: "AI Price Guide 会处理付款或账号吗？",
    },
    answer: {
      en: "No. AI Price Guide only provides price information, plan comparisons and external platform links. It does not sell accounts or process payments.",
      zh: "不会。AI Price Guide 只提供价格信息、方案比较和外部平台链接，不销售账号，也不处理付款。",
    },
  },
];

function toFinderPlan(toolId: AiToolId, plan: RecommendationPlanMock): FinderPlan {
  return {
    id: `${toolId}-${plan.providerId}`,
    platformId: plan.providerId,
    platformName: plan.providerName,
    planType: plan.providerId === "official" ? "official" : "platform",
    monthlyPriceUsd: plan.price,
    priceLabel: plan.priceLabel,
    savingPercent: plan.savingPercent,
    availability: localize(plan.availability, availabilityCopy),
    riskNote: localize(plan.riskLevel, riskCopy),
    suitableFor: localize(plan.bestFor, bestForCopy),
    ctaLabel: ctaCopy[plan.ctaLabel],
    externalUrl: plan.url,
    riskRank: providerRiskRank[plan.providerId],
  };
}

function localize(value: string, dictionary: Record<string, LocalizedText>) {
  return dictionary[value] ?? { en: value, zh: value };
}
