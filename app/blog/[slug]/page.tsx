import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
} from "@/lib/blog-data";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Guide not found | AI Price Guide",
    };
  }

  return {
    title: `${post.title} | AI Price Guide`,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        en: `/blog/${post.slug}`,
        "zh-CN": `/zh/blog/${post.slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `/blog/${post.slug}`,
      siteName: "AI Price Guide",
      title: `${post.title} | AI Price Guide`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <LanguageProvider>
      <main className="min-h-screen overflow-hidden">
        <Header />

        <article>
          <header className="page-shell pb-10 pt-12 md:pb-14 md:pt-16">
            <div className="mx-auto max-w-[780px]">
              <a
                className="text-xs font-semibold text-[#0071e3] transition hover:text-[#0068d1]"
                href="/blog"
              >
                ← Subscription Guides
              </a>

              <p className="mt-9 text-xs font-semibold uppercase tracking-[0.15em] text-[#0071e3]">
                {post.category}
              </p>
              <h1 className="mt-4 text-[38px] font-semibold leading-[1.08] tracking-[-0.05em] text-[#111111] md:text-[56px]">
                {post.title}
              </h1>
              <p className="mt-5 max-w-[720px] text-base leading-8 text-[#606a78] md:text-lg">
                {post.excerpt}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#7a8392]">
                <span>{post.readingTime}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={toDateTime(post.publishedAt)}>
                  {post.publishedAt}
                </time>
              </div>
            </div>
          </header>

          <div className="page-shell">
            <div className="mx-auto max-w-[780px] border-t border-[#e5e7eb] pt-10 md:pt-14">
              <div className="space-y-11">
                {post.content.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#171717] md:text-[28px]">
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
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#111111]">
                  Compare current platform options
                </h2>
                <p className="mt-3 max-w-[650px] text-sm leading-7 text-[#606a78]">
                  Go back to the homepage, choose the AI tool you use, and
                  compare available platform options, price notes, and risk
                  considerations.
                </p>
                <a
                  className="blue-button mt-5 inline-flex min-h-10 items-center justify-center rounded-xl px-5 py-2 text-xs font-semibold text-white transition"
                  href="/"
                >
                  View platform options
                </a>
              </section>
            </div>
          </div>
        </article>

        <section className="page-shell py-14 md:py-16">
          <div className="mx-auto max-w-[960px]">
            <h2 className="text-[26px] font-semibold tracking-[-0.035em] text-[#111111]">
              Related guides
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <a
                  className="card-hover flex min-h-[210px] flex-col rounded-[22px] border border-[#e5e7eb] bg-white p-5"
                  href={`/blog/${relatedPost.slug}`}
                  key={relatedPost.slug}
                >
                  <span className="text-[11px] font-semibold text-[#75808e]">
                    {relatedPost.category}
                  </span>
                  <h3 className="mt-3 text-base font-semibold leading-6 tracking-[-0.02em] text-[#111111]">
                    {relatedPost.title}
                  </h3>
                  <p className="mt-3 text-[12px] leading-5 text-[#6b7280]">
                    {relatedPost.excerpt}
                  </p>
                  <span className="mt-auto pt-5 text-xs font-semibold text-[#0071e3]">
                    Read guide →
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
