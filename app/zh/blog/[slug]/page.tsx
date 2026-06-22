import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";
import {
  chineseBlogPosts,
  getChineseBlogPost,
  getRelatedChinesePosts,
} from "@/lib/blog-data-zh";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type ChineseBlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return chineseBlogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: ChineseBlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getChineseBlogPost(slug);

  if (!post) {
    return { title: "文章未找到 | AI Price Guide" };
  }

  return {
    title: `${post.title} | AI Price Guide`,
    description: post.excerpt,
    alternates: {
      canonical: `/zh/blog/${post.slug}`,
      languages: {
        en: `/blog/${post.slug}`,
        "zh-CN": `/zh/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: "zh_CN",
      url: `/zh/blog/${post.slug}`,
      siteName: "AI Price Guide",
      title: `${post.title} | AI Price Guide`,
      description: post.excerpt,
    },
  };
}

export default async function ChineseBlogPostPage({
  params,
}: ChineseBlogPostPageProps) {
  const { slug } = await params;
  const post = getChineseBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedChinesePosts(post);

  return (
    <LanguageProvider initialLocale="zh">
      <main className="min-h-screen overflow-hidden">
        <Header />
        <article>
          <header className="page-shell pb-10 pt-12 md:pb-14 md:pt-16">
            <div className="mx-auto max-w-[780px]">
              <a className="text-xs font-semibold text-[#0071e3]" href="/zh/blog">
                ← 订阅指南
              </a>
              <p className="mt-9 text-xs font-semibold tracking-[0.15em] text-[#0071e3]">
                {post.category}
              </p>
              <h1 className="mt-4 text-[36px] font-semibold leading-[1.12] tracking-[-0.045em] md:text-[56px]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-[720px] text-base leading-8 text-[#606a78] md:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#7a8392]">
                <span>阅读时间：{post.readingTime}</span>
                <span aria-hidden="true">·</span>
                <span>
                  发布日期：
                  <time dateTime={toDateTime(post.publishedAt)}>
                    {post.publishedAt}
                  </time>
                </span>
              </div>
            </div>
          </header>
          <div className="page-shell">
            <div className="mx-auto max-w-[780px] border-t border-[#e5e7eb] pt-10 md:pt-14">
              <div className="space-y-11">
                {post.content.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-[24px] font-semibold tracking-[-0.03em] md:text-[28px]">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4">
                      {section.paragraphs.map((paragraph) => (
                        <p
                          className="text-[15px] leading-8 text-[#4f5967] md:text-base"
                          key={paragraph}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
              <section className="mt-14 rounded-[24px] border border-[#dce8f7] bg-[#f6faff] px-6 py-8 md:px-9">
                <h2 className="text-[22px] font-semibold tracking-[-0.03em]">
                  比较当前平台选择
                </h2>
                <p className="mt-3 max-w-[650px] text-sm leading-7 text-[#606a78]">
                  回到首页，选择你正在使用的 AI 工具，比较当前可用平台、价格提示和风险说明。
                </p>
                <a
                  className="blue-button mt-5 inline-flex min-h-10 items-center justify-center rounded-xl px-5 py-2 text-xs font-semibold text-white"
                  href="/zh"
                >
                  查看平台选择
                </a>
              </section>
            </div>
          </div>
        </article>
        <section className="page-shell py-14 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="text-[26px] font-semibold tracking-[-0.035em]">
              相关阅读
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <a
                  className="card-hover flex min-h-[210px] flex-col rounded-[22px] border border-[#e5e7eb] bg-white p-5"
                  href={`/zh/blog/${relatedPost.slug}`}
                  key={relatedPost.slug}
                >
                  <span className="text-[11px] font-semibold text-[#75808e]">
                    {relatedPost.category}
                  </span>
                  <h3 className="mt-3 text-base font-semibold leading-6">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-5 text-[#6b7280]">
                    {relatedPost.excerpt}
                  </p>
                  <span className="mt-auto pt-5 text-xs font-semibold text-[#0071e3]">
                    阅读指南 →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </LanguageProvider>
  );
}

function toDateTime(publishedAt: string) {
  return new Date(publishedAt).toISOString().slice(0, 10);
}
