import { SiteShell } from "@/components/site-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Price Guide | AI 订阅价格比较与最低价策略",
  description:
    "比较 ChatGPT、Claude、Gemini 等 AI 工具的官方价格、共享平台选项、可用性提示和风险因素。",
  alternates: {
    canonical: "/zh",
    languages: {
      en: "/",
      "zh-CN": "/zh",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/zh",
    siteName: "AI Price Guide",
    title: "AI Price Guide | AI 订阅价格比较与最低价策略",
    description:
      "比较 ChatGPT、Claude、Gemini 等 AI 工具的官方价格、共享平台选项、可用性提示和风险因素。",
  },
};

export default function ChineseHomePage() {
  return <SiteShell locale="zh" />;
}
