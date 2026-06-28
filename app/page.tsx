import { SiteShell } from "@/components/site-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Plan Map | Compare AI Subscription Prices and Lowest-Price Strategies",
  description:
    "Compare official prices, shared platform options, availability notes, and risk factors for ChatGPT, Claude, Gemini, Grok and other AI tools.",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      "zh-CN": "/zh",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "AI Plan Map",
    title: "AI Plan Map | Compare AI Subscription Prices and Lowest-Price Strategies",
    description:
      "Compare official prices, shared platform options, availability notes, and risk factors for ChatGPT, Claude, Gemini, Grok and other AI tools.",
  },
};

export default function HomePage() {
  return <SiteShell locale="en" />;
}
