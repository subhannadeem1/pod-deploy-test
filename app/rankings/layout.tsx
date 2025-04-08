import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Metadata } from "next"

interface RankingsLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Rankings | The Pod Transcripts",
  description: "Free, highly accurate transcripts of popular podcasts, complete with speaker identification and printable PDFs.",
}

export default async function RankingsLayout({ children }: RankingsLayoutProps) {
  return (
    <>
      <SiteHeader />

      <main id = "rankings-page-layout" className="relative flex-1 md:min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
        <div
          className="absolute inset-0 -z-10 bg-pattern opacity-10 pointer-events-none"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/asfalt-light.png')" }}
        />
        {children}
      </main>

      <SiteFooter />
    </>
  )
}