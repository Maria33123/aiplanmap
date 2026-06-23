import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "AI Plan Map | Compare AI Tools, Plans and Pricing",
  description:
    "Compare AI tools, subscription plans, pricing notes, and safer options for ChatGPT, Claude, Gemini, Midjourney, Cursor, Perplexity and more.",
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
    title: "AI Plan Map | Compare AI Tools, Plans and Pricing",
    description:
      "Compare AI tools, subscription plans, pricing notes, and safer options for ChatGPT, Claude, Gemini, Midjourney, Cursor, Perplexity and more.",
  },
  twitter: {
    card: "summary",
    title: "AI Plan Map | Compare AI Tools, Plans and Pricing",
    description:
      "Compare AI tools, subscription plans, pricing notes, and safer options for ChatGPT, Claude, Gemini, Midjourney, Cursor, Perplexity and more.",
  },
  icons: {
    icon: [
      { url: "/brand/daisy-16.png", sizes: "16x16", type: "image/png" },
      { url: "/brand/daisy-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/daisy-64.png", sizes: "64x64", type: "image/png" },
      { url: "/brand/daisy-128.png", sizes: "128x128", type: "image/png" },
      { url: "/brand/daisy-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/brand/daisy-32.png",
    apple: [
      { url: "/brand/daisy-256.png", sizes: "256x256", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
