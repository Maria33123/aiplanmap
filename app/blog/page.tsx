import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";
import { blogArticles, blogCategories } from "@/lib/blog-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscription Guides | AI Plan Map",
  description:
    "Learn about AI subscription pricing, shared-platform risks, lowest-price strategies, and safer ways to compare options.",
  alternates: {
    canonical: "/blog",
    languages: {
      en: "/blog",
      "zh-CN": "/zh/blog",
    },
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "AI Plan Map",
    title: "Subscription Guides | AI Plan Map",
    description:
      "Learn about AI subscription pricing, shared-platform risks, lowest-price strategies, and safer ways to compare options.",
  },
};

export default function BlogPage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen overflow-hidden">
        <Header />

        <section className="page-shell pb-6 pt-9 md:pb-8 md:pt-12">
          <div className="max-w-[760px]">
            <h1 className="text-[38px] font-semibold leading-[1.1] tracking-[-0.05em] text-[#111111] md:text-[52px]">
              Subscription Guides
            </h1>
            <p className="mt-3 text-sm leading-7 text-[#6b7280] md:text-base">
              Learn about AI subscription pricing, shared-platform risks,
              lowest-price strategies, and safer ways to save.
            </p>
          </div>

          <nav
            aria-label="Article categories"
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2"
          >
            {blogCategories.map((category, index) => (
              <span
                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-medium ${
                  index === 0
                    ? "bg-[#eef6ff] text-[#0071e3]"
                    : "text-[#5f6875]"
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
            {blogArticles.map((article) => (
              <article
                className="flex min-h-[176px] flex-col rounded-[20px] border border-[#e5e7eb] bg-white p-5"
                key={article.slug}
              >
                <span className="text-[11px] font-medium text-[#75808e]">
                  {article.category}
                </span>
                <h2 className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[#111111]">
                  {article.title}
                </h2>
                <p className="mt-2 text-[13px] leading-6 text-[#6b7280]">
                  {article.excerpt}
                </p>
                <a
                  aria-label={`Read guide: ${article.title}`}
                  className="mt-auto pt-4 text-xs font-semibold text-[#0071e3]"
                  href={`/blog/${article.slug}`}
                >
                  Read guide <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="page-shell py-10 md:py-12">
          <div className="rounded-[22px] border border-[#e5e7eb] bg-white px-6 py-8 text-center md:px-10">
            <h2 className="text-[23px] font-semibold tracking-[-0.03em] md:text-[27px]">
              Want to see how much you could save?
            </h2>
            <p className="mx-auto mt-3 max-w-[620px] text-sm leading-7 text-[#6b7280]">
              Go back to the homepage, choose the AI tool you use, and compare
              currently available platform options.
            </p>
            <a
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-xl border border-[#0071e3] px-5 py-2 text-xs font-semibold text-[#0071e3] transition hover:bg-[#f0f7ff]"
              href="/"
            >
              View Recommended Platforms
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </LanguageProvider>
  );
}

