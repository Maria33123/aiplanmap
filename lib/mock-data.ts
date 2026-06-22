export type AiToolCategory = "writing" | "coding" | "search" | "image";

export type AiToolId =
  | "chatgpt-plus"
  | "claude-pro"
  | "gemini-advanced"
  | "perplexity-pro"
  | "midjourney"
  | "cursor-pro";

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
    bestPrice: 7.2,
    bestPriceLabel: "from $7.20/mo",
    savingPercent: 64,
    iconName: "chatgpt",
    category: "writing",
    mark: "●",
    accentClass: "bg-[#10a37f] text-white",
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
  {
    id: "gemini-advanced",
    name: "Gemini Advanced",
    shortName: "Gemini",
    officialPrice: 19.99,
    officialPriceLabel: "$19.99/mo",
    bestPrice: 6,
    bestPriceLabel: "from $6.00/mo",
    savingPercent: 70,
    iconName: "gemini",
    category: "writing",
    mark: "✦",
    accentClass: "bg-[#edf3ff] text-[#4285f4]",
  },
  {
    id: "perplexity-pro",
    name: "Perplexity Pro",
    shortName: "Perplexity",
    officialPrice: 20,
    officialPriceLabel: "$20/mo",
    bestPrice: 6.88,
    bestPriceLabel: "from $6.88/mo",
    savingPercent: 66,
    iconName: "perplexity",
    category: "search",
    mark: "◇",
    accentClass: "bg-[#ecf9fa] text-[#15929e]",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    shortName: "Midjourney",
    officialPrice: 30,
    officialPriceLabel: "$30/mo",
    bestPrice: 9.99,
    bestPriceLabel: "from $9.99/mo",
    savingPercent: 67,
    iconName: "midjourney",
    category: "image",
    mark: "◒",
    accentClass: "bg-[#eef0f2] text-[#111827]",
  },
  {
    id: "cursor-pro",
    name: "Cursor Pro",
    shortName: "Cursor",
    officialPrice: 20,
    officialPriceLabel: "$20/mo",
    bestPrice: 6.9,
    bestPriceLabel: "from $6.90/mo",
    savingPercent: 65,
    iconName: "cursor",
    category: "coding",
    mark: "◆",
    accentClass: "bg-[#161616] text-white",
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
    platformPlan("gamsgo", "$7.20/mo", 7.2, 64, "High", "Moderate", "Lowest-price priority"),
    platformPlan("spliiit", "$8.50/mo", 8.5, 58, "Medium", "Moderate", "Sharing transparency"),
    officialPlan(20, "$20/mo"),
  ],
  "claude-pro": [
    platformPlan("gamsgo", "$6.50/mo", 6.5, 68, "High", "Moderate", "Lowest-price priority"),
    platformPlan("spliiit", "$8.20/mo", 8.2, 59, "Medium", "Moderate", "Sharing transparency"),
    officialPlan(20, "$20/mo"),
  ],
  "gemini-advanced": [
    platformPlan("gamsgo", "$6.00/mo", 6, 70, "High", "Moderate", "Lowest-price priority"),
    platformPlan("sharesub", "$7.40/mo", 7.4, 63, "Medium", "Moderate", "Flexible shared plans"),
    officialPlan(19.99, "$19.99/mo"),
  ],
  "perplexity-pro": [
    platformPlan("gamsgo", "$6.88/mo", 6.88, 66, "High", "Moderate", "Lowest-price priority"),
    platformPlan("spliiit", "$8.00/mo", 8, 60, "Medium", "Moderate", "Sharing transparency"),
    officialPlan(20, "$20/mo"),
  ],
  midjourney: [
    platformPlan("gamsgo", "$9.99/mo", 9.99, 67, "High", "Moderate", "Lowest-price priority"),
    platformPlan("sharesub", "$12.50/mo", 12.5, 58, "Medium", "Moderate", "Flexible shared plans"),
    officialPlan(30, "$30/mo"),
  ],
  "cursor-pro": [
    platformPlan("gamsgo", "$6.90/mo", 6.9, 65, "High", "Moderate", "Lowest-price priority"),
    platformPlan("spliiit", "$8.25/mo", 8.25, 59, "Medium", "Moderate", "Sharing transparency"),
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
