import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Metadata } from "next";

interface AboutLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "About | The Pod Transcripts",
  description: "Free, highly accurate transcripts of popular podcasts, complete with speaker identification and printable PDFs.",
};

export default async function AboutLayout({ children }: AboutLayoutProps) {
  return (
    <>
      <link
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        rel="stylesheet"
      />

      <SiteHeader />

      <main className="mx-auto flex-1 md:min-h-screen overflow-hidden bg-black">
        <div className="relative">
          {children}
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
