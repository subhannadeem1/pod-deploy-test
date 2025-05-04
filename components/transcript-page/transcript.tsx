import Image from "next/image"

import { useState } from "react"
import { IBM_Plex_Serif, Roboto } from 'next/font/google'

import { allInReadings } from "@/app/data/readings/allInReadings"
import { dwarkeshReadings } from "@/app/data/readings/dwarkeshReadings"
import { hubermanReadings } from "@/app/data/readings/hubermanReadings"
import { jreReadings } from "@/app/data/readings/jreReadings"
import { lexFridmanReadings } from "@/app/data/readings/lexFridmanReadings"
import { noJumperReadings } from "@/app/data/readings/noJumperReadings"
import { badFriendsReadings } from "@/app/data/readings/badFriendsReadings"
import { tigerbellyReadings } from "@/app/data/readings/tigerbellyReadings"

import { allInSummaries } from "@/app/data/summaries/allInSummaries"
import { dwarkeshSummaries } from "@/app/data/summaries/dwarkeshSummaries"
import { hubermanSummaries } from "@/app/data/summaries/hubermanSummaries"
import { jreSummaries } from "@/app/data/summaries/jreSummaries"
import { lexFridmanSummaries } from "@/app/data/summaries/lexFridmanSummaries"
import { badFriendsSummaries } from "@/app/data/summaries/badFriendsSummaries"
import { tigerbellySummaries } from "@/app/data/summaries/tigerbellySummaries"

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-ibm-plex-serif',
})

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const fetchBooks = (slug: string) => {
  if (slug === "jre") return jreReadings
  if (slug === "lex-fridman") return lexFridmanReadings
  if (slug === "huberman") return hubermanReadings
  if (slug === "all-in") return allInReadings
  if (slug === "dwarkesh") return dwarkeshReadings
  if (slug === "no-jumper") return noJumperReadings
  if (slug === "bad-friends") return badFriendsReadings
  if (slug === "tigerbelly") return tigerbellyReadings
  return null
}

const fetchKeyPoints = (slug: string) => {
  if (slug === "all-in") return allInSummaries
  if (slug === "dwarkesh") return dwarkeshSummaries
  if (slug === "huberman") return hubermanSummaries
  if (slug === "jre") return jreSummaries
  if (slug === "lex-fridman") return lexFridmanSummaries
  if (slug === "bad-friends") return badFriendsSummaries
  if (slug === "tigerbelly") return tigerbellySummaries
  return null
}

const splitSummary = (summary: string) => {
  const parts = summary.split(":")
  if (parts.length > 1) {
    return { title: parts[0].trim(), content: parts.slice(1).join(":").trim() }
  }
  return { title: "", content: summary }
}

const TranscriptComponent = (props: any) => {
  const { data, tabIndex, slug, episode } = props
  const [fontSizeIndex, setFontSizeIndex] = useState(0)
  const fontSizes = ["text-xs", "text-sm", "text-base", "text-lg", "text-xl"]

  const increaseFontSize = () => {
    setFontSizeIndex((prev) => Math.min(prev + 1, fontSizes.length - 1))
  }

  const decreaseFontSize = () => {
    setFontSizeIndex((prev) => Math.max(prev - 1, 0))
  }

  const renderContent = () => {
    
    // TRANSCRIPT TAB
    if (tabIndex === 0) {
      return data?.length ? (
        <div>
          <div className="flex justify-end items-center mb-2 space-x-2 text-gray-500">
            <button
              type="button"
              onClick={decreaseFontSize}
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-xs"
            >
              –
            </button>
            <button
              type="button"
              onClick={increaseFontSize}
              className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100 transition text-xs"
            >
              +
            </button>
          </div>

          {data.map((transcript: any) => (
            <div key={transcript.id} className="flex flex-col mb-4">
              <div
                className={`font-[${ibmPlexSerif.style.fontFamily}] font-semibold tracking-wide text-gray-900 ${fontSizes[fontSizeIndex]}`}
              >
                {transcript.speaker}
              </div>
              <p
                className={`${fontSizes[fontSizeIndex]} text-gray-800 tracking-wide leading-relaxed mt-1`}
              >
                {transcript.text}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 text-sm">
          Transcript Unavailable
        </div>
      )
    }

    // SUGGESTED READINGS TAB
    if (tabIndex === 1) {
      const books = fetchBooks(slug)?.get(episode)
      return books?.length ? (
        books.map((link: string, idx: number) => (
          <a
            key={idx}
            href={link.split("+")[3]}
            target="_blank"
            className="flex items-start mb-4 border border-transparent hover:border-blue-500 hover:bg-gray-100 rounded-lg p-4 group transition"
          >
            <div className="flex-auto">
              <p
                className={`font-[${ibmPlexSerif.style.fontFamily}] text-sm text-gray-900 group-hover:text-blue-600 transition-colors`}
              >
                {link.split("+")[1]}
              </p>
              <p className="text-xs text-gray-600 mt-1 group-hover:text-gray-800 transition-colors">
                {link.split("+")[2]}
              </p>
            </div>
            <Image
              className="h-20 w-20 rounded-full bg-gray-50 ml-4"
              src={"/" + slug + "/" + link.split("+")[0]}
              alt=""
              width={80}
              height={80}
            />
          </a>
        ))
      ) : (
        <div className="text-center text-gray-400 text-sm">
          References Unavailable
        </div>
      )
    }
      
    // SUMMARY TAB
    if (tabIndex === 2) {
      const summaries = fetchKeyPoints(slug)?.get(episode)
      return summaries?.length ? (
        summaries.map((summary: string, idx: number) => {
          const { title, content } = splitSummary(summary)
          return (
            <div
              key={idx}
              className="flex flex-col bg-gray-50 border-l-4 border-blue-500 p-3 mb-4"
            >
              <p className="text-xs text-gray-800 leading-snug">
                {title && <span className="font-bold">{title}:</span>} {content}
              </p>
            </div>
          )
        })
      ) : (
        <div className="text-center text-gray-400 text-sm">
          Summary Unavailable
        </div>
      )
    }

    return null
  }

  return (
    <div
      className={`bg-white shadow-sm -mx-4 sm:mx-0 ${roboto.className} min-h-[400px] px-4 py-4`}
    >
      {renderContent()}
    </div>
  )
}

export default TranscriptComponent