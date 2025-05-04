import "./globals.css";

import Script from "next/script";

import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ui/theme-provider";

import type { Metadata } from "next";
import React from "react";
import ScrollToTop from "@/components/ScrollToTop";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "The Pod Transcripts",
  description:
    "Free, highly accurate transcripts of popular podcasts, complete with speaker identification and printable PDFs.",
  verification: { google: "googlef71e111bdf4b26d9" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5058851609859176"
        crossOrigin="anonymous"
        async
      />

      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>

        <Analytics />

        <SpeedInsights />
        <ScrollToTop />
      </body>
    </html>
  );
}
