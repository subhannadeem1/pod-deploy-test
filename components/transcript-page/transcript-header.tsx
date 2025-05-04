"use client";

import {
  allInPodcastDates,
  dwarkeshPodcastDates,
  hubermanPodcastDates,
  jrePodcastDates,
  lexFridmanPodcastDates,
  noJumperPodcastDates,
  badFriendsDates,
  tigerbellyDates,
  pardonMyTakeDates,
  bigHonkerDates,
  upFirstDates,
  crimeJunkieDates,
  theRingerDates,
  wasThatTmiDates,
  shawnRyanDates,
  telepathyTapesDates,
} from "@/app/data/general/episode-dates";
import {
  allInPodcastLengths,
  dwarkeshPodcastLengths,
  hubermanPodcastLengths,
  jrePodcastLengths,
  lexFridmanPodcastLengths,
  noJumperPodcastLengths,
  badFriendsLengths,
  tigerbellyLengths,
  pardonMyTakeLengths,
  bigHonkerLengths,
  upFirstLengths,
  crimeJunkieLengths,
  theRingerLengths,
  wasThatTmiLengths,
  shawnRyanLengths,
  telepathyTapesLengths,
} from "@/app/data/general/episode-lengths";
import { fetchTitle } from "@/utils/fetch-title";
import {
  IconArrowLeft,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

import Link from "next/link";

const fetchDates = (slug: string) => {
  if (slug === "all-in") return allInPodcastDates;
  if (slug === "dwarkesh") return dwarkeshPodcastDates;
  if (slug === "huberman") return hubermanPodcastDates;
  if (slug === "jre") return jrePodcastDates;
  if (slug === "lex-fridman") return lexFridmanPodcastDates;
  if (slug === "no-jumper") return noJumperPodcastDates;
  if (slug === "bad-friends") return badFriendsDates;
  if (slug === "tigerbelly") return tigerbellyDates;
  if (slug === "pardon-my-take") return pardonMyTakeDates;
  if (slug == "big-honker") return bigHonkerDates;
  if (slug == "up-first") return upFirstDates;
  if (slug == "crime-junkie") return crimeJunkieDates;
  if (slug == "the-ringer") return theRingerDates;
  if (slug == "was-that-tmi") return wasThatTmiDates;
  if (slug == "shawn-ryan") return shawnRyanDates;
  if (slug == "telepathy-tapes") return telepathyTapesDates;
};

// Fetch Lengths
const fetchLengths = (slug: string) => {
  if (slug === "all-in") return allInPodcastLengths;
  if (slug === "dwarkesh") return dwarkeshPodcastLengths;
  if (slug === "huberman") return hubermanPodcastLengths;
  if (slug === "jre") return jrePodcastLengths;
  if (slug === "lex-fridman") return lexFridmanPodcastLengths;
  if (slug === "no-jumper") return noJumperPodcastLengths;
  if (slug === "bad-friends") return badFriendsLengths;
  if (slug === "tigerbelly") return tigerbellyLengths;
  if (slug === "pardon-my-take") return pardonMyTakeLengths;
  if (slug == "big-honker") return bigHonkerLengths;
  if (slug == "up-first") return upFirstLengths;
  if (slug == "crime-junkie") return crimeJunkieLengths;
  if (slug == "the-ringer") return theRingerLengths;
  if (slug == "was-that-tmi") return wasThatTmiLengths;
  if (slug == "shawn-ryan") return shawnRyanLengths;
  if (slug == "telepathy-tapes") return telepathyTapesLengths;
};

const TranscriptHeaderComponent = (props: any) => {
  const { slug, episode } = props;

  // Helper functions to calculate previous and next episodes
  const prevEpisode = (slug: string, episode: string) => {
    const epNum = parseInt(episode, 10);
    return epNum > 1 ? (epNum - 1).toString() : "1";
  };

  const nextEpisode = (slug: string, episode: string) => {
    const epNum = parseInt(episode, 10);
    // Replace this logic with actual total episodes if available
    return (epNum + 1).toString();
  };

  return (
    <>
      <header>
        {/* Breadcrumb and Arrows on the same line */}
        <div className="flex justify-between items-center mb-4">
          {/* Breadcrumb */}
          <div className="flex items-center">
            <Link
              href={`/podcast/${encodeURIComponent(slug)}`}
              className="flex items-center text-sm font-medium text-[#8B949E] hover:text-gray-300"
            >
              <div className="h-10 w-10 border border-[#17212A] flex justify-center items-center rounded-full">
                <IconArrowLeft stroke={1} className="w-6 h-6 " />
              </div>
              <div className="border-y border-r border-[#17212A] -ml-[2px] flex items-center h-9 px-3 rounded-r-full text-[14px] font-medium">
                All Episodes
              </div>
            </Link>
          </div>
          {/* Arrows */}
          <div className="flex space-x-2">
            <Link
              href={`/podcast/${slug}/${prevEpisode(slug, episode)}`}
              className="text-sm text-[#8B949E] hover:text-gray-300 h-10 w-10 border border-[#17212A] flex justify-center items-center rounded-full hover:bg-[#0A1016] focus:outline-none cursor-pointer transition duration-200 ease-in-out"
              aria-label="Previous Episode"
            >
              <IconChevronLeft stroke={1} />
            </Link>
            <Link
              href={`/podcast/${slug}/${nextEpisode(slug, episode)}`}
              className="text-sm text-[#8B949E] hover:text-gray-300 h-10 w-10 border border-[#17212A] flex justify-center items-center rounded-full hover:bg-[#0A1016] focus:outline-none cursor-pointer transition duration-200 ease-in-out"
              aria-label="Next Episode"
            >
              <IconChevronRight stroke={1} />
            </Link>
          </div>
        </div>
        {/* Title */}
        <div className="min-w-0 flex-1 pl-2">
          <h1 className="flex gap-x-3 text-xl sm:text-2xl md:text-3xl leading-tight tracking-tight text-white">
            <span className="font-bold">{fetchTitle(slug)?.get(episode)}</span>
          </h1>
        </div>
        {/* Episode Info */}
        <span className="flex items-center text-sm text-[#D1D5DB] pl-3 pt-2 md:pt-4">
          E{episode} • {fetchDates(slug)?.get(episode)} •{" "}
          {fetchLengths(slug)?.get(episode)}
        </span>
      </header>
    </>
  );
};

export default TranscriptHeaderComponent;
