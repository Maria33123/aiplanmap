import { aiTools, platforms as mockPlatforms } from "./mock-data";

export type Subscription = {
  name: string;
  mark: string;
  accent: string;
  officialPrice: string;
  bestPrice: string;
  saving: string;
};

export const subscriptions: Subscription[] = aiTools.map((tool) => ({
  name: tool.name,
  mark: tool.mark,
  accent: tool.accentClass,
  officialPrice: tool.officialPriceLabel,
  bestPrice: tool.bestPriceLabel,
  saving: `${tool.savingPercent}%`,
}));

export const features = [
  {
    icon: "search",
    title: "Lowest Price Finder",
    description: "Find the best available option across official plans and trusted platforms.",
  },
  {
    icon: "chart",
    title: "Savings Snapshot",
    description: "See how much you could save monthly and yearly before subscribing.",
  },
  {
    icon: "shield",
    title: "Risk-Aware Guide",
    description: "Compare price, availability, platform reliability and account risk together.",
  },
] as const;

export const platforms = mockPlatforms.map((platform) => ({
  name: platform.name,
  range: platform.pricePosition,
  availability: platform.availability,
  risk: platform.riskNote,
  bestFor: platform.bestFor,
}));

export const comparisons = [
  "ChatGPT vs Claude",
  "Claude vs Gemini",
  "ChatGPT Plus vs Pro",
  "Perplexity vs ChatGPT",
  "Best AI subscription for students",
  "Best AI subscription for coding",
];

export const guides = [
  {
    icon: "shield",
    title: "Is shared AI subscription safe?",
    description: "Understand the risks, safety tips, and how to protect your account.",
  },
  {
    icon: "message",
    title: "Cheapest way to use ChatGPT Plus",
    description: "Compare prices and find the lowest-cost options that work.",
  },
  {
    icon: "scale",
    title: "GamsGo vs Spliiit: which is better?",
    description: "Feature, price and risk comparison to help you choose confidently.",
  },
  {
    icon: "article",
    title: "How to avoid overpaying for AI tools",
    description: "Simple tips to save more without sacrificing experience.",
  },
] as const;
