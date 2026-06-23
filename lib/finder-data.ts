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
      zh: "缁煎悎鎺ㄨ崘",
    },
    description: {
      en: "Balance price, availability and risk.",
      zh: "骞宠　浠锋牸銆佸彲鐢ㄦ€у拰椋庨櫓銆?",
    },
  },
  {
    id: "lowest",
    title: {
      en: "Lowest price",
      zh: "鏈€浣庝环鏍?",
    },
    description: {
      en: "Prioritize the lowest-price platform.",
      zh: "浼樺厛灞曠ず浠锋牸鏈€浣庣殑骞冲彴銆?",
    },
  },
  {
    id: "safer",
    title: {
      en: "Lower risk",
      zh: "椋庨櫓鏇翠綆",
    },
    description: {
      en: "Prioritize more conservative options.",
      zh: "浼樺厛灞曠ず鏇寸ǔ濡ョ殑閫夋嫨銆?",
    },
  },
];

const availabilityCopy: Record<string, LocalizedText> = {
  High: { en: "High", zh: "楂?" },
  Medium: { en: "Medium", zh: "涓?" },
  Always: { en: "Always", zh: "濮嬬粓鍙敤" },
};

const riskCopy: Record<string, LocalizedText> = {
  Moderate: { en: "Moderate", zh: "涓瓑" },
  Lowest: { en: "Lowest", zh: "鏈€浣?" },
};

const bestForCopy: Record<string, LocalizedText> = {
  "Lowest-price priority": {
    en: "Lowest-price priority",
    zh: "鏈€浣庝环浼樺厛",
  },
  "Sharing transparency": {
    en: "Sharing transparency",
    zh: "鍏变韩閫忔槑搴︿紭鍏?",
  },
  "Flexible shared plans": {
    en: "Flexible shared plans",
    zh: "鐏垫椿鏂规",
  },
  "Account safety first": {
    en: "Account safety first",
    zh: "璐﹀彿瀹夊叏浼樺厛",
  },
};

const platformDescriptionCopy: Record<ProviderId, LocalizedText> = {
  official: {
    en: "Account safety first, highest price.",
    zh: "璐﹀彿瀹夊叏浼樺厛锛屼环鏍兼渶楂?",
  },
  gamsgo: {
    en: "Clear price advantage, useful for lowest-price priority.",
    zh: "浠锋牸浼樺娍鏄庢樉锛岄€傚悎鏈€浣庝环浼樺厛",
  },
  spliiit: {
    en: "Higher sharing transparency, useful for group sharing.",
    zh: "鍏变韩閫忔槑搴﹁緝楂橈紝閫傚悎澶氫汉鍏变韩",
  },
  sharesub: {
    en: "Flexible shared plans, useful as an additional option.",
    zh: "鍏变韩鏂规鐏垫椿锛屽彲浣滀负琛ュ厖閫夋嫨",
  },
};

const ctaCopy: Record<RecommendationPlanMock["ctaLabel"], LocalizedText> = {
  "View Platform Plan": {
    en: "View Platform Plan",
    zh: "鏌ョ湅骞冲彴鏂规",
  },
  "View Official Plan": {
    en: "View Official Plan",
    zh: "鏌ョ湅瀹樻柟鏂规",
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
      zh: "鍏变韩 AI 璁㈤槄瀹夊叏鍚楋紵",
    },
    answer: {
      en: "Shared subscriptions can involve availability, refund, stability and policy risks. Review each platform's plan details before deciding.",
      zh: "鍏变韩璁㈤槄骞冲彴鍙兘娑夊強璐﹀彿鍙敤鎬с€侀€€娆俱€佽闂ǔ瀹氭€у拰骞冲彴鏀跨瓥鍙樺寲绛夐闄┿€傞€夋嫨鍓嶈鏌ョ湅姣忎釜鏂规璇存槑銆?",
    },
  },
  {
    question: {
      en: "Why do prices vary so much between platforms?",
      zh: "涓轰粈涔堜笉鍚屽钩鍙颁环鏍煎樊杩欎箞澶氾紵",
    },
    answer: {
      en: "Different platforms may use different subscription models, sharing rules, inventory and service policies, so the final monthly cost can vary.",
      zh: "涓嶅悓骞冲彴鐨勮闃呮ā寮忋€佸叡浜鍒欍€佸簱瀛樺拰鏈嶅姟鏀跨瓥涓嶅悓锛屽洜姝ゆ渶缁堟湀璐逛細鏈夋槑鏄惧樊寮傘€?",
    },
  },
  {
    question: {
      en: "Is the lowest-price plan always best for me?",
      zh: "鏈€浣庝环鏂规涓€瀹氭渶閫傚悎鎴戝悧锛?",
    },
    answer: {
      en: "Not always. Price is only one factor. Availability, platform stability, account risk and your usage pattern should be considered together.",
      zh: "涓嶄竴瀹氥€備环鏍煎彧鏄洜绱犱箣涓€锛岃繕闇€瑕佺患鍚堣€冭檻鍙敤鎬с€佸钩鍙扮ǔ瀹氭€с€佽处鍙烽闄╁拰浣犵殑浣跨敤棰戠巼銆?",
    },
  },
  {
    question: {
      en: "Does AI Plan Map handle payments or accounts?",
      zh: "AI Plan Map 浼氬鐞嗕粯娆炬垨璐﹀彿鍚楋紵",
    },
    answer: {
      en: "No. AI Plan Map only provides price information, plan comparisons and external platform links. It does not sell accounts or process payments.",
      zh: "涓嶄細銆侫I Plan Map 鍙彁渚涗环鏍间俊鎭€佹柟妗堟瘮杈冨拰澶栭儴骞冲彴閾炬帴锛屼笉閿€鍞处鍙凤紝涔熶笉澶勭悊浠樻銆?",
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

