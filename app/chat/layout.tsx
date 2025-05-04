// app/chat/layout.tsx
import { Suspense } from "react"; // Import Suspense
//import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Metadata } from "next";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "AI-Powered Search Engine | The Pod Transcripts",
  description:
    "Free, highly accurate transcripts of popular podcasts, complete with speaker identification and printable PDFs.",
};

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto flex-1 overflow-hidden bg-black">
        {/* Wrap children with Suspense */}
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </main>

      {/*<SiteFooter />*/}
    </>
  );
}