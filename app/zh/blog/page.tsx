import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";
import { chineseBlogPosts } from "@/lib/blog-data-zh";
import type { Metadata } from "next";

const categories = ["全部", "ChatGPT", "Claude", "共享平台", "避坑", "价格对比"];

export const metadata: Metadata = {
  title: "订阅指南 | AI Plan Map",
  description:
    "了解 AI 订阅价格、共享平台风险、最低价策略和更安全的比较方式。",
  alternates: {
    canonical: "/zh/blog",
    languages: {
      en: "/blog",
      "zh-CN": "/zh/blog",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/zh/blog",
    siteName: "AI Plan Map",
    title: "订阅指南 | AI Plan Map",
    description:
      "了解 AI 订阅价格、共享平台风险、最低价策略和更安全的比较方式。",
  },
};

export default function ChineseBlogPage() {
  return (
    <LanguageProvider initialLocale="zh">
      <main className="min-h-screen overflow-hidden">
        <Header />
        <section className="page-shell pb-6 pt-9 md:pb-8 md:pt-12">
          <div className="max-w-[760px]">
            <h1 className="text-[38px] font-semibold leading-[1.1] tracking-[-0.05em] text-[#111111] md:text-[52px]">
              订阅指南
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#6b7280] md:text-base">
              了解 AI 订阅价格、共享平台风险、最低价策略和避坑建议。
            </p>
          </div>
          <nav aria-label="文章分类" className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
            {categories.map((category, index) => (
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                  index === 0 ? "bg-[#eef6ff] text-[#0071e3]" : "text-[#5f6875]"
                }`}
                key={category}
              >
                {category}
              </span>
            ))}
          </nav>
        </section>
        <section className="page-shell">
          <div className="grid gap-3 md:grid-cols-2">
            {chineseBlogPosts.map((post) => (
              <article
                className="flex min-h-[176px] flex-col rounded-[20px] border border-[#e5e7eb] bg-white p-5"
                key={post.slug}
              >
                <span className="text-[11px] font-medium text-[#75808e]">
                  {post.category}
                </span>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em]">
                  {post.title}
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-[#6b7280]">
                  {post.excerpt}
                </p>
                <a
                  className="mt-auto pt-4 text-xs font-semibold text-[#0071e3]"
                  href={`/zh/blog/${post.slug}`}
                >
                  阅读指南 →
                </a>
              </article>
            ))}
          </div>
        </section>
        <section className="page-shell py-10 md:py-12">
          <div className="rounded-[22px] border border-[#e5e7eb] bg-white px-6 py-8 text-center">
            <h2 className="text-[23px] font-semibold tracking-[-0.03em]">
              想先看看能省多少钱？
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-7 text-[#6b7280]">
              回到首页，选择你正在使用的 AI 工具，查看当前可用平台和预计节省金额。
            </p>
            <a
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0071e3] px-5 py-2 text-xs font-semibold text-[#0071e3]"
              href="/zh"
            >
              查看推荐平台
            </a>
          </div>
        </section>
        <Footer />
      </main>
    </LanguageProvider>
  );
}
