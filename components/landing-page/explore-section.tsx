"use client";

import React, { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // Import Framer Motion
import Link from "next/link"; // Import Link for routing
import { topPodcasts, topEpisodes } from "@/app/data/rankings/rankings";
import { IconDotsVertical } from "@tabler/icons-react";

/** Defines the props for each ranking item (podcast/episode). */
interface RankingCardProps {
  rank: number | string;
  name: string;
  host: string;
  image: string;
  alias: string;
  episode?: string;
  type: "podcast" | "episode";
}

/** Reusable card component for displaying ranking details with Link. */
const RankingCard: FC<RankingCardProps> = ({ rank, name, host, image, alias, episode, type }) => {
  // Determine the URL based on the type
  const href = type === "podcast" ? `/podcast/${alias}` : `/podcast/${alias}/${episode}`;

  // Animation variants for the card
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Link href={href} passHref>
      <motion.div
        className="
          flex items-center md:gap-6 gap-4 md:p-4 p-2 rounded-lg
          min-h-[96px]
          lg:bg-white/5 lg:backdrop-blur-md lg:ring-1 lg:ring-white/10
          lg:hover:bg-white/10 transition-colors shadow-lg
          overflow-hidden cursor-pointer md:mb-6 mb-4
        "
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Rank */}
        <div className="md:w-16  text-center flex-shrink-0">
          <span className="text-2xl md:text-4xl font-bold text-white drop-shadow-md">
            {rank}
          </span>
        </div>

        {/* Image & Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Image
            src={image}
            alt={name}
            width={80}
            height={80}
            className="rounded-lg object-cover shadow-md flex-shrink-0"
          />

          {/* Text Container */}
          <div className="flex flex-col min-w-0 overflow-hidden">
            <h4
              className="
                text-base md:text-lg font-semibold text-white
                mb-1
                truncate whitespace-nowrap overflow-ellipsis
              "
            >
              {name}
            </h4>
            <p
              className="
                text-sm md:text-base font-light text-white/60
                truncate whitespace-nowrap overflow-ellipsis
              "
            >
              {host}
            </p>
          </div>
        </div>
        <div className="text-white">
        <IconDotsVertical stroke={2} />
          </div>
      </motion.div>
    </Link>
  );
};

// Animation variants for the heading and subtitle
const headingVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

const subtitleVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const ExploreSection: FC = () => {
  // Get today's date and format it
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className=" mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 mt-16 mb-20 flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1">
        {/* Heading & Subtitle */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white/90 drop-shadow-lg"
            variants={headingVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Trending Now
          </motion.h2>
          <motion.p
            className="mt-4 md:mt-6 text-sm md:text-xl text-white/70 drop-shadow-sm"
            variants={subtitleVariants}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            Explore the most popular podcasts and episodes, curated just for you.
          </motion.p>
        </motion.div>

        {/* Desktop & Tablet Layout */}
        <div className="hidden lg:grid grid-cols-2 gap-12 mt-16">
          {/* Left Column: Top Podcasts */}
          <div>
            <h3 className="mb-6 text-3xl font-bold text-white drop-shadow-sm">
              Top Podcasts
            </h3>
            <div className="space-y-6">
              {topPodcasts?.map((podcast) => (
                <RankingCard
                  key={podcast.id}
                  rank={podcast.rank}
                  name={podcast.name}
                  host={podcast.host}
                  image={podcast.image}
                  alias={podcast.alias} // Pass alias for URL
                  type="podcast" // Mark this as a podcast
                />
              ))}
            </div>
          </div>

          {/* Right Column: Top Episodes */}
          <div>
            <h3 className="mb-6 text-3xl font-bold text-white drop-shadow-sm">
              Top Episodes
            </h3>
            <div className="space-y-6">
              {topEpisodes?.map((episode, idx) => (
                <RankingCard
                  key={`episode-${idx}-${episode.alias}`}
                  rank={episode.rank}
                  name={episode.name}
                  host={episode.host}
                  image={episode.image}
                  alias={episode.alias} // Pass alias for URL
                  episode={episode.episode} // Pass episode identifier
                  type="episode" // Mark this as an episode
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden mt-10 space-y-10">
          {/* Top Podcasts - Mobile */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">
              Top Podcasts
            </h3>
            <div className="space-y-4">
              {topPodcasts?.map((podcast, idx) => (
                <RankingCard
                  key={`mobile-podcast-${idx}-${podcast.alias}`}
                  rank={podcast.rank}
                  name={podcast.name}
                  host={podcast.host}
                  image={podcast.image}
                  alias={podcast.alias} // Pass alias for URL
                  type="podcast" // Mark this as a podcast
                />
              ))}
            </div>
          </div>

          {/* Top Episodes - Mobile */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">
              Top Episodes
            </h3>
            <div className="space-y-4">
              {topEpisodes?.map((episode, idx) => (
                <RankingCard
                  key={`mobile-episode-${idx}-${episode.alias}`}
                  rank={episode.rank}
                  name={episode.name}
                  host={episode.host}
                  image={episode.image}
                  alias={episode.alias} // Pass alias for URL
                  episode={episode.episode} // Pass episode identifier
                  type="episode" // Mark this as an episode
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Added Last Updated Text */}
      <motion.p
        className="mt-8 text-xs md:text-sm text-white/50 text-right drop-shadow-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        Last Updated: {formattedDate}
      </motion.p>
    </div>
  );
};

export default ExploreSection;