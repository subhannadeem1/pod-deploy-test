import { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface PrivacyLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Privacy Policy | The Pod Transcripts",
  description:
    "Free, highly accurate transcripts of popular podcasts, complete with speaker identification and printable PDFs.",
};

export default async function PrivacyLayout({ children }: PrivacyLayoutProps) {
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
