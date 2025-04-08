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
    <main className={`mt-32 ${Barlow.className} bg-black min-h-screen text-white`} data-nosnippet>
      {/* Container */}
      <div className="container mx-auto px-4 lg:px-20 xl:px-32">

        {/* Section - Episode Description */}
        <section className="mb-6">
          <div className="flex flex-col">
            <div className="mb-4">
              <nav className="flex" aria-label="Breadcrumb">
                <Link
                  href="/"
                  className="group flex items-center text-sm font-medium text-white hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="mr-2 h-5 w-5 text-white group-hover:text-gray-300"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Home
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