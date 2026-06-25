export type AiToolCategory = "writing" | "coding" | "search" | "image";

export type AiToolId =
  | "chatgpt-plus"
  | "gemini-advanced"
  | "grok"
  | "claude-pro";

export type ProviderId = "official" | "gamsgo" | "spliiit" | "sharesub";

export type AiToolMock = {
  id: AiToolId;
  name: string;
  shortName: string;
  officialPrice: number;
  officialPriceLabel: string;
  bestPrice: number;
  bestPriceLabel: string;
  savingPercent: number;
  iconName: string;
  category: AiToolCategory;
  mark: string;
  accentClass: string;
};

export type PlatformMock = {
  id: ProviderId;
  name: string;
  description: string;
  pricePosition: string;
  availability: string;
  riskNote: string;
  bestFor: string;
  url: string;
};

export type RecommendationPlanMock = {
  providerId: ProviderId;
  providerName: string;
  price: number;
  priceLabel: string;
  savingPercent: number;
  availability: string;
  riskLevel: string;
  bestFor: string;
  ctaLabel: string;
  url: string;
};

export const aiTools: AiToolMock[] = [
  {
    id: "chatgpt-plus",
    name: "ChatGPT Plus",
    shortName: "ChatGPT",
    officialPrice: 20,
    officialPriceLabel: "$20/mo",
    bestPrice: 4.77,
    bestPriceLabel: "from $4.77/mo",
    savingPercent: 76,
    iconName: "chatgpt",
    category: "writing",
    mark: "●",
    accentClass: "bg-[#10a37f] text-white",
  },
  {
    id: "gemini-advanced",
    name: "Gemini Pro",
    shortName: "Gemini Pro",
    officialPrice: 19.99,
    officialPriceLabel: "$19.99/mo",
    bestPrice: 3.55,
    bestPriceLabel: "from $3.55/mo",
    savingPercent: 82,
    iconName: "gemini",
    category: "writing",
    mark: "✦",
    accentClass: "bg-[#edf3ff] text-[#4285f4]",
  },
  {
    id: "grok",
    name: "Super Grok",
    shortName: "Super Grok",
    officialPrice: 30,
    officialPriceLabel: "$30/mo",
    bestPrice: 9.67,
    bestPriceLabel: "from $9.67/mo",
    savingPercent: 68,
    iconName: "grok",
    category: "search",
    mark: "𝕏",
    accentClass: "bg-[#111111] text-white",
  },
  {
    id: "claude-pro",
    name: "Claude Pro",
    shortName: "Claude",
    officialPrice: 20,
    officialPriceLabel: "$20/mo",
    bestPrice: 6.5,
    bestPriceLabel: "from $6.50/mo",
    savingPercent: 68,
    iconName: "claude",
    category: "writing",
    mark: "AI",
    accentClass: "bg-[#e8dfd4] text-[#171717]",
  },
];

export const platforms: PlatformMock[] = [
  {
    id: "official",
    name: "Official Plan",
    description: "Account safety first, highest price.",
    pricePosition: "High",
    availability: "Always",
    riskNote: "Lowest",
    bestFor: "Account safety first",
    url: "#",
  },
  {
    id: "gamsgo",
    name: "GamsGo",
    description: "Clear price advantage, useful for lowest-price priority.",
    pricePosition: "Low",
    availability: "High",
    riskNote: "Moderate",
    bestFor: "Lowest-price priority",
    url: "#",
  },
  {
    id: "spliiit",
    name: "Spliiit",
    description: "Higher sharing transparency, useful for group sharing.",
    pricePosition: "Low",
    availability: "Medium",
    riskNote: "Moderate",
    bestFor: "Sharing transparency",
    url: "#",
  },
  {
    id: "sharesub",
    name: "Sharesub",
    description: "Flexible shared plans, useful as an additional option.",
    pricePosition: "Low",
    availability: "Medium",
    riskNote: "Moderate",
    bestFor: "Flexible shared plans",
    url: "#",
  },
];

export const recommendationPlansByToolId: Record<
  AiToolId,
  RecommendationPlanMock[]
> = {
  "chatgpt-plus": [
    platformPlan(
      "gamsgo",
      "$4.77/mo",
      4.77,
      76,
      "High",
      "Moderate",
      "Lowest-price priority",
    ),
    platformPlan(
      "spliiit",
      "$8.50/mo",
      8.5,
      58,
      "Medium",
      "Moderate",
      "Sharing transparency",
    ),
    officialPlan(20, "$20/mo"),
  ],

  "gemini-advanced": [
    platformPlan(
      "gamsgo",
      "$3.55/mo",
      3.55,
      82,
      "High",
      "Moderate",
      "Lowest-price priority, minimum 3 months",
    ),
    platformPlan(
      "sharesub",
      "$7.40/mo",
      7.4,
      63,
      "Medium",
      "Moderate",
      "Flexible shared plans",
    ),
    officialPlan(19.99, "$19.99/mo"),
  ],

  grok: [
    platformPlan(
      "gamsgo",
      "$9.67/mo",
      9.67,
      68,
      "High",
      "Moderate",
      "Exclusive plan, minimum 3 months",
    ),
    officialPlan(30, "$30/mo"),
  ],

  "claude-pro": [
    platformPlan(
      "gamsgo",
      "$6.50/mo",
      6.5,
      68,
      "High",
      "Moderate",
      "Lowest-price priority",
    ),
    platformPlan(
      "spliiit",
      "$8.20/mo",
      8.2,
      59,
      "Medium",
      "Moderate",
      "Sharing transparency",
    ),
    officialPlan(20, "$20/mo"),
  ],
};

function platformPlan(
  providerId: Exclude<ProviderId, "official">,
  priceLabel: string,
  price: number,
  savingPercent: number,
  availability: string,
  riskLevel: string,
  bestFor: string,
): RecommendationPlanMock {
  const provider = getPlatform(providerId);

  return {
    providerId,
    providerName: provider.name,
    price,
    priceLabel,
    savingPercent,
    availability,
    riskLevel,
    bestFor,
    ctaLabel: "View Platform Plan",
    url: provider.url,
  };
}

function officialPlan(price: number, priceLabel: string): RecommendationPlanMock {
  const provider = getPlatform("official");

  return {
    providerId: "official",
    providerName: provider.name,
    price,
    priceLabel,
    savingPercent: 0,
    availability: provider.availability,
    riskLevel: provider.riskNote,
    bestFor: provider.bestFor,
    ctaLabel: "View Official Plan",
    url: provider.url,
  };
}

function getPlatform(providerId: ProviderId) {
  const provider = platforms.find((platform) => platform.id === providerId);

  if (!provider) {
    throw new Error(`Unknown provider: ${providerId}`);
  }

  return provider;
}
