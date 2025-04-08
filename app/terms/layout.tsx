import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Metadata } from "next";

interface TermsLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Terms of Use | The Pod Transcripts",
  description:
    "Free, highly accurate transcripts of popular podcasts, complete with speaker identification and printable PDFs.",
};

export default async function TermsLayout({ children }: TermsLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex-1 md:min-h-screen overflow-hidden bg-black">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
