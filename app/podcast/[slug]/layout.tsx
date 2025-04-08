import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import QueryWrapper from "./QueryWrapper";
import Script from "next/script";

interface PodcastLayoutProps {
  children: React.ReactNode;
}

export default async function PodcastLayout({ children }: PodcastLayoutProps) {
  return (
    <>
      <Script async src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5058851609859176" crossOrigin = "anonymous" />
      <QueryWrapper>
        <SiteHeader />
          <main className = "bg-black mx-auto flex-1 overflow-hidden">
            { children }
          </main>
        <SiteFooter />
      </QueryWrapper>
    </>
  );
}