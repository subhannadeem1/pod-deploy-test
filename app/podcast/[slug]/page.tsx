"use client"

import axios from "axios"
import EpisodeDescription from "@/components/episode-list/episode-description"
import EpisodeGrid from "@/components/episode-list/episode-grid"
import Link from "next/link"

import { Barlow } from "@/fonts/Barlow"
import { EpisodeType } from "@/types/EpisodeType"
import { EpisodeURL } from "@/types/EpisodeURL"
import { useQuery } from "@tanstack/react-query"
import AdsComponentOne from "@/components/ads/ad-one"

// General
import { podcastTitles } from "@/app/data/general/pod-data"
import { IconArrowLeft } from "@tabler/icons-react"

// Fetch All Episodes
const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/podcasts/${slug}`)
  return response.data
}

export default function PodcastDetail(url: EpisodeURL) {
  const { data, isLoading } = useQuery<EpisodeType[]>({
    queryKey: ["detail-podcast", url.params.slug],
    queryFn: () => fetchDetails(url.params.slug),
  })

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-300"></div>
      </div>
    )

  document.title = `${podcastTitles.get(url.params.slug)} | The Pod Transcripts`
  document.querySelector('meta[name="description"]')
    ?.setAttribute(
      "content",
      `Free, highly accurate transcripts of ${podcastTitles.get(url.params.slug)}, complete with speaker identification and printable PDFs.`
    )

  return (
    <main className={`md:mt-[100px] mt-28  ${Barlow.className} bg-black min-h-screen text-white`} data-nosnippet>
      {/* Container */}
      <div className="container mx-auto px-4 lg:px-20 xl:px-32">

        {/* Section - Episode Description */}
        <section className="mb-4">
          <div className="flex flex-col">
            <div className="mb-4">
              <nav className="flex" aria-label="Breadcrumb">
                <Link
                  href="/"
                  className="group flex  items-center text-[#8B949E] hover:text-gray-300 transition-colors"
                >
                  <div className="h-10 w-10 border border-[#17212A] flex justify-center items-center rounded-full">
                  <IconArrowLeft stroke={1} className="w-6 h-6 " />
                  </div>
                  <div className="border-y border-r border-[#17212A] -ml-[2px] flex items-center h-9 px-3 rounded-r-full text-[14px] font-medium">
                  Back to Home
                  </div>
                  
                </Link>
              </nav>
            </div>

            <EpisodeDescription slug={url.params.slug} />
          </div>
        </section>

        {/* Section - Episode Grid */}
        <section className="mb-12">
          <EpisodeGrid
            params={{ slug: url.params.slug }}
            searchParams={url.searchParams}
          />
        </section>

        {/* Section - Google Ad */}
        <section className="flex justify-center mb-10">
          <AdsComponentOne />
        </section>

      </div>
    </main>
  )
}