"use client"

import axios from "axios"
import Link from "next/link"
import Head from "next/head"

import { Barlow } from "@/fonts/Barlow"
import { fetchBrowserTitle } from "@/utils/fetch-title"
import { TranscriptType } from "@/types/TranscriptType"
import { TranscriptURL } from "@/types/TranscriptURL"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"

// Metadata
import { allInMetadata } from "@/app/data/metadata/allInMetadata"
import { dwarkeshMetadata } from "@/app/data/metadata/dwarkeshMetadata"
import { hubermanMetadata } from "@/app/data/metadata/hubermanMetadata"
import { jreMetadata } from "@/app/data/metadata/jreMetadata"
import { lexFridmanMetadata } from "@/app/data/metadata/lexFridmanMetadata"
import { noJumperMetadata } from "@/app/data/metadata/noJumperMetadata"

// Components
import TranscriptHeaderComponent from "@/components/transcript-page/transcript-header"
import TranscriptTabsComponent from "@/components/transcript-page/transcript-tabs"
import TranscriptSidebarComponent from "@/components/transcript-page/transcript-sidebar"
import TranscriptListenButtonsComponent from "@/components/transcript-page/transcript-listen-buttons"
import TranscriptComponent from "@/components/transcript-page/transcript"

const fetchDetails = async (slug: string, episode: string) => {
  const response = await axios.get(`/api/podcasts/${slug}/${episode}`)
  return response.data
}

const fetchBrowserDescription = (slug: string) => {
  const metadataMap: { [key: string]: any } = {
    "all-in": allInMetadata,
    "jre": jreMetadata,
    "lex-fridman": lexFridmanMetadata,
    "huberman": hubermanMetadata,
    "no-jumper": noJumperMetadata,
    "dwarkesh": dwarkeshMetadata,
  }
  return metadataMap[slug]
}

export default function EpisodeDetail(url: TranscriptURL) {

  const { data, isLoading, isError, error } = useQuery<TranscriptType[]>({
    queryKey: ["detail-podcast", url.params.slug, url.params.episode],
    queryFn: () => fetchDetails(url.params.slug, url.params.episode),
  })

  const [tabIndex, setTabIndex] = useState<number>(0)

  // Calculate previous and next episode numbers
  const currentEpisode = parseInt(url.params.episode, 10)
  const prevEpisode = currentEpisode > 1 ? currentEpisode - 1 : 1
  const nextEpisode = currentEpisode + 1 // Consider validating this value

  // Handle error state
  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <p className="text-white">An error occurred: {error.message}</p>
        <Link href="/" className="mt-4 text-blue-500">
          Go back to home
        </Link>
      </div>
    )
  }

  // Loading animation
  if (isLoading)
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-gray-300 mb-4"></div>
        <p className="text-white">Loading episode details...</p>
      </div>
    )

  // Prepare metadata
  const pageTitle = (fetchBrowserTitle(url.params.slug, url.params.episode, false) + " | The Pod Transcripts") || "Episode Details"
  const pageDescription = (fetchBrowserDescription(url.params.slug)?.get(url.params.episode) + " | The Pod Transcripts") || "Podcast episode details."

  document.title = pageTitle

  return (
    <>
      <main className={`py-4 md:py-6 lg:py-8 min-h-screen scroll-smooth ${Barlow.className}`}>
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="mt-24 mx-auto grid grid-cols-1 grid-rows-1 items-start gap-x-6 gap-y-0 md:gap-y-6 lg:gap-x-8 lg:gap-y-8 md:mx-0 md:max-w-none md:grid-cols-4">
            <TranscriptSidebarComponent slug={url.params.slug} />

            <div className="md:col-span-3 md:row-span-2 md:row-end-2 pr-4 pt-4">
              <div className="space-y-4">

                {/* Title and additional header information */}
                <TranscriptHeaderComponent
                  slug={url.params.slug}
                  episode={url.params.episode}
                />

                <TranscriptListenButtonsComponent
                  slug={url.params.slug}
                  episode={url.params.episode}
                />

                <TranscriptTabsComponent
                  tabIndex={tabIndex}
                  setTabIndex={setTabIndex}
                />
              </div>

              <TranscriptComponent
                data={data}
                tabIndex={tabIndex}
                slug={url.params.slug}
                episode={url.params.episode}
              />

              {url.params.slug === "tigerbelly" && url.params.episode === "123" && (
                <p className="text-white mt-4">
                  Special thanks to DJRollerBladez!
                </p>
              )}

            </div>
          </div>
        </div>
      </main>
    </>
  )
}