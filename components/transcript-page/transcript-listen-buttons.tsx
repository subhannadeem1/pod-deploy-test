import Link from "next/link"

import { allInSourceLinks } from "@/app/data/source-links/allInSourceLinks"
import { dwarkeshSourceLinks } from "@/app/data/source-links/dwarkeshSourceLinks"
import { hubermanSourceLinks } from "@/app/data/source-links/hubermanSourceLinks"
import { lexFridmanSourceLinks } from "@/app/data/source-links/lexFridmanSourceLinks"
import { noJumperSourcelinks } from "@/app/data/source-links/noJumperSourceLinks"
import { jreSourceLinks } from "@/app/data/source-links/jreSourceLinks"
import { badFriendsSourceLinks } from "@/app/data/source-links/badFriendsSourceLinks"
import { tigerbellySourceLinks } from "@/app/data/source-links/tigerbellySourceLinks"
import { bigHonkerSourcelinks } from "@/app/data/source-links/bigHonkerSourceLinks"
import { pardonMyTakeSourceLinks } from "@/app/data/source-links/pardonMyTakeSourceLinks"
import { upFirstSourceLinks } from "@/app/data/source-links/upFirstSourceLinks"
import { crimeJunkieSourceLinks } from "@/app/data/source-links/crimeJunkieSourceLinks"
import { theRingerSourceLinks } from "@/app/data/source-links/theRingerSourceLinks"
import { wasThatTmiSourcelinks } from "@/app/data/source-links/wasThatTmiSourceLinks"
import { telepathyTapesSourceLinks } from "@/app/data/source-links/telepathyTapesSourceLinks"

const fetchSourceLinks = (slug: string) => {
  if (slug == "all-in") return allInSourceLinks
  if (slug == "dwarkesh") return dwarkeshSourceLinks
  if (slug == "huberman") return hubermanSourceLinks
  if (slug == "lex-fridman") return lexFridmanSourceLinks
  if (slug == "no-jumper") return noJumperSourcelinks
  if (slug == "jre") return jreSourceLinks
  if (slug == "bad-friends") return badFriendsSourceLinks
  if (slug == "tigerbelly") return tigerbellySourceLinks
  if (slug == "big-honker") return bigHonkerSourcelinks
  if (slug == "pardon-my-take") return pardonMyTakeSourceLinks
  if (slug == "up-first") return upFirstSourceLinks
  if (slug == "crime-junkie") return crimeJunkieSourceLinks
  if (slug == "the-ringer") return theRingerSourceLinks
  if (slug == "was-that-tmi") return wasThatTmiSourcelinks
  if (slug == "telepathy-tapes") return telepathyTapesSourceLinks

  return allInSourceLinks
}

const TranscriptListenButtonsComponent = (props: any) => {
  const { slug, episode } = props
  const sourceCount = fetchSourceLinks(slug)
    ?.get(episode)
    ?.filter((x) => x !== "").length

  return (
    <>
      <div className="flex flex-wrap pl-1 items-center">
        {/* Source Links */}
        <div className="flex flex-wrap gap-2">
          {fetchSourceLinks(slug)
            ?.get(episode)
            ?.map((source, idx) => (
              <div key={idx}>
                {source !== "" && (
                  <a href={source} target="_blank">
                    <img
                      className="
                        h-8 md:h-10 
                        aspect-[3] md:aspect-[4] 
                        transition-transform duration-200 ease-in-out 
                        hover:scale-105 hover:opacity-90
                      "
                      src={`\\source${idx}.svg`}
                      alt="Listen on YouTube"
                    />
                  </a>
                )}
              </div>
            ))}
        </div>

        {/* Buttons Section */}
        <div className="ml-auto mt-2 flex gap-2">

          {/* Print Transcript Button */}
          <Link
            href={`/files/${slug}-${episode}.pdf`}
            target="_blank"
            rel="noreferrer"
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-md px-4 py-2 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-teal-500 to-blue-500 opacity-20 blur-sm"></div>
            <div className="relative z-10 text-white font-medium flex items-center justify-center gap-1">
              {/* Document Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8.414a2 2 0 00-.586-1.414l-5.414-5.414A2 2 0 0014.586 2H5zm8 0v4a2 2 0 002 2h4v10a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h8z" />
              </svg>
              Print Transcript
            </div>
          </Link>

          {/* AI Chat Button */}
          <Link
            href={`/podcast/${encodeURIComponent(slug)}/${encodeURIComponent(episode)}/chat`}
            className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-md px-4 py-2 text-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 text-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-sm"></div>
            <div className="relative z-10 text-white font-medium flex items-center justify-center gap-1">
              {/* Chat Bubble Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M12 3C6.477 3 2 6.794 2 11c0 1.985.94 3.815 2.52 5.222a8.466 8.466 0 01-.498 2.867c-.3.78.594 1.533 1.318 1.145C6.877 19.928 9.353 19 12 19c5.523 0 10-3.794 10-8S17.523 3 12 3zM9 13h6a1 1 0 100-2H9a1 1 0 100 2zm0-3h6a1 1 0 100-2H9a1 1 0 100 2z" />
              </svg>
              AI Chat
            </div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default TranscriptListenButtonsComponent