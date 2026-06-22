import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform Notice | AI Price Guide",
  description:
    "Learn how AI Price Guide presents third-party platform information, pricing notes, and risk considerations.",
  alternates: {
    canonical: "/platform-notice",
    languages: {
      en: "/platform-notice",
      "zh-CN": "/zh/platform-notice",
    },
  },
  openGraph: {
    type: "website",
    url: "/platform-notice",
    siteName: "AI Price Guide",
    title: "Platform Notice | AI Price Guide",
    description:
      "Learn how AI Price Guide presents third-party platform information, pricing notes, and risk considerations.",
  },
};

const paragraphs = [
  "AI Price Guide is an independent information website that helps users compare AI subscription prices, official plans, shared-platform options, availability notes, and risk considerations.",
  "AI Price Guide does not sell accounts, process payments, manage subscriptions, or provide customer support for third-party platforms.",
  "All platform information is provided for reference only. Prices, availability, refund rules, access stability, and platform policies may change over time.",
  "If users choose to visit a third-party platform, they should review that platform’s own terms, pricing, refund policy, and account-access rules before making a decision.",
  "AI Price Guide is not responsible for third-party pricing, service quality, account access, refunds, or support.",
];

export default function PlatformNoticePage() {
  return (
    <LanguageProvider>
      <main className="min-h-screen overflow-hidden">
        <Header />

        <section className="page-shell py-12 md:py-16">
          <article className="mx-auto max-w-[760px]">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#0071e3]">
              AI Price Guide
            </p>
            <h1 className="mt-4 text-[36px] font-semibold leading-[1.1] tracking-[-0.045em] text-[#111111] md:text-[50px]">
              Third-Party Platform Notice
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
