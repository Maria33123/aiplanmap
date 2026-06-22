import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LanguageProvider } from "@/components/language-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Price Guide - Finder moved to the homepage",
  description: "The lowest-price finder is now available on the homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function FinderMergedPage() {
  return (
    <LanguageProvider>
      <main className="flex min-h-screen flex-col overflow-hidden">
        <Header />

        <section className="page-shell flex flex-1 items-center justify-center py-16">
          <div className="surface soft-shadow w-full max-w-[680px] rounded-[28px] p-8 text-center md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0071e3]">
              AI Price Guide
            </p>
            <h1 className="mt-4 text-[32px] font-semibold tracking-[-0.045em] text-[#111111] md:text-[42px]">
              The Finder Has Moved to the Homepage
            </h1>
            <p className="mx-auto mt-4 max-w-[520px] text-sm leading-7 text-[#6b7280]">
              The lowest-price finder is now available on the homepage. Return
              there to view recommended platforms.
            </p>
            <a
              className="blue-button mt-8 inline-flex min-h-11 items-center justify-center rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition"
              href="/"
            >
              Return Home
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </LanguageProvider>
  );
}
