import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "平台说明 | AI Plan Map",
  description:
    "了解 AI Plan Map 如何展示第三方平台信息、价格提示和风险因素。",
  alternates: {
    canonical: "/zh/platform-notice",
    languages: {
      en: "/platform-notice",
      "zh-CN": "/zh/platform-notice",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/zh/platform-notice",
    siteName: "AI Plan Map",
    title: "平台说明 | AI Plan Map",
    description:
      "了解 AI Plan Map 如何展示第三方平台信息、价格提示和风险因素。",
  },
};

const paragraphs = [
  "AI Plan Map 是一个独立信息网站，帮助用户比较 AI 订阅价格、官方方案、共享平台选项、可用性提示和风险因素。",
  "AI Plan Map 不销售账号、不处理付款、不管理订阅，也不为第三方平台提供客服支持。",
  "所有平台信息仅供参考。价格、可用性、退款规则、访问稳定性和平台政策都可能随时间变化。",
  "如果用户选择访问第三方平台，应在做决定前查看该平台自己的服务条款、价格、退款政策和账号访问规则。",
  "AI Plan Map 不对第三方平台的价格、服务质量、账号访问、退款或支持负责。",
];

export default function ChinesePlatformNoticePage() {
  return (
    <LanguageProvider initialLocale="zh">
      <main className="min-h-screen overflow-hidden">
        <Header />
        <section className="page-shell py-12 md:py-16">
          <article className="mx-auto max-w-[760px]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
              AI Plan Map
            </p>
            <h1 className="mt-4 text-[36px] font-semibold leading-[1.1] tracking-[-0.045em] md:text-[50px]">
              平台说明
            </h1>
            <div className="mt-8 space-y-5 text-sm leading-7 text-[#5f6875] md:text-[15px]">
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </section>
        <Footer />
      </main>
    </LanguageProvider>
  );
}
