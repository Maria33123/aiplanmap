"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { HomeFinderSection } from "@/components/HomeFinderSection";
import { Hero } from "@/components/hero";
import { LanguageProvider } from "@/components/language-provider";
import {
  GuidesSection,
  PlatformComparison,
} from "@/components/home-sections";
import type { Locale } from "@/lib/i18n";

export function SiteShell({ locale = "en" }: { locale?: Locale }) {
  return (
    <LanguageProvider initialLocale={locale}>
      <main className="min-h-screen overflow-hidden">
        <Header />
        <Hero />
        <HomeFinderSection />
        <PlatformComparison />
        <GuidesSection />
        <Footer />
      </main>
    </LanguageProvider>
  );
}
