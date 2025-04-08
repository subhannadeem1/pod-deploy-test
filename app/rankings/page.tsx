"use client";

import React, { FC } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { topPodcasts, topEpisodes } from "@/app/data/rankings/rankings";

interface RankingCardProps {
  rank: number | string;
  name: string;
  episode: string | undefined;
  host: string;
  image: string;
  alias: string;
  type: "podcast" | "episode";
  delay: number;
}

// Ranking Card Component with delay prop
const RankingCard: FC<RankingCardProps> = ({
  rank,
  name,
  episode,
  host,
  image,
  alias,
  type,
  delay,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.4, ease: "easeInOut" }} // Adjusted duration to 0.4s for faster animation
    >
      <Link
        href={type === "podcast" ? `/podcast/${alias}` : `/podcast/${alias}/${episode}`}
        passHref
      >
        <div className="flex items-center gap-6 p-4 rounded-lg min-h-[96px] bg-white/5 backdrop-blur-md ring-1 ring-white/10 hover:bg-white/10 transition-colors shadow-lg overflow-hidden mb-6">
          <div className="w-16 text-center flex-shrink-0">
            <span className="text-3xl md:text-4xl font-bold text-white/60 drop-shadow-md">
              {rank}
            </span>
          </div>
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <Image
              src={image}
              alt={name}
              width={80}
              height={80}
              className="rounded-lg object-cover shadow-md flex-shrink-0"
            />
            <div className="flex flex-col min-w-0 overflow-hidden">
              <h4 className="text-base md:text-lg font-semibold text-white/90 mb-1 truncate whitespace-nowrap overflow-ellipsis">
                {name}
              </h4>
              <p className="text-sm md:text-base font-light text-white/60 truncate whitespace-nowrap overflow-ellipsis">
                {host}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

// Animation variants for Framer Motion (if needed for container)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Items fade in one after the other
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Main Page Component
const Page: FC = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-6 lg:px-8 mt-32 mb-20 flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white/90 drop-shadow-lg"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }} // Reduced duration to 0.8s for smoother animation
          >
            Trending Now
          </motion.h2>
          <motion.p
            className="mt-4 md:mt-6 text-sm md:text-xl text-white/70 drop-shadow-sm"
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }} // Adjusted delay to 0.3s and duration to 0.8s
          >
            Explore the most popular podcasts and episodes, curated just for you.
          </motion.p>
        </div>

        <motion.div
          className="hidden lg:grid grid-cols-2 gap-12 mt-16"
          initial="hidden"
          animate="visible"
        >
          {/* Top Podcasts Section */}
          <div>
            <motion.h3
              className="mb-6 text-2xl font-semibold text-white/80 drop-shadow-sm"
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4, ease: "easeInOut" }} // Adjusted delay to 1.0s and duration to 0.4s
            >
              Top Podcasts
            </motion.h3>
            <div className="space-y-6">
              {topPodcasts.map((podcast, index) => (
                <RankingCard
                  key={podcast.id}
                  rank={podcast.rank}
                  name={podcast.name}
                  episode={undefined}
                  host={podcast.host}
                  image={podcast.image}
                  alias={podcast.alias}
                  type="podcast"
                  delay={1.0 + index * 0.1} // Adjusted stagger delay to 0.1s for faster animation
                />
              ))}
            </div>
          </div>

          {/* Top Episodes Section */}
          <div>
            <motion.h3
              className="mb-6 text-2xl font-semibold text-white/80 drop-shadow-sm"
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.4, ease: "easeInOut" }} // Adjusted delay to 1.0s and duration to 0.4s
            >
              Top Episodes
            </motion.h3>
            <div className="space-y-6">
              {topEpisodes.map((episode, index) => (
                <RankingCard
                  key={`episode-${index}-${episode.alias}`}
                  rank={episode.rank}
                  name={episode.name}
                  episode={episode.episode}
                  host={episode.host}
                  image={episode.image}
                  alias={episode.alias}
                  type="episode"
                  delay={1.0 + index * 0.1} // Adjusted stagger delay to 0.1s for faster animation
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.p
        className="mt-8 text-xs md:text-sm text-white/50 text-right drop-shadow-sm"
        initial={{ opacity: 0, y: -5, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2.0, duration: 0.8, ease: "easeInOut" }} // Adjusted delay to 2.0s and duration to 0.8s
      >
        Last Updated: {formattedDate}
      </motion.p>
    </div>
  );
};

export default Page;