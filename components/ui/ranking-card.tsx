"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// Define RankingCard Component
interface RankingCardProps {
  rank: number | string;
  name: string;
  host: string;
  image: string;
  alias: string;  // Added alias prop for URL generation
  type: "podcast" | "episode";  // Added type to differentiate podcast vs episode
}

const RankingCard: FC<RankingCardProps> = ({ rank, name, host, image, alias, type }) => {
  const [isClient, setIsClient] = useState(false); // Track if the component is rendered on the client side
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set isClient to true once the component mounts on the client
  }, []);

  const handleClick = () => {
    if (type === "podcast") {
      router.push(`/podcast/${alias}`);
    } else {
      router.push(`/podcast/${alias}/1169`); // Update 1169 to dynamic episode number if available
    }
  };

  if (!isClient) return null; // Avoid rendering until mounted on the client

  return (
    <div
      className="flex items-center gap-6 p-4 rounded-lg min-h-[96px] bg-white/5 backdrop-blur-md ring-1 ring-white/10 hover:bg-white/10 transition-colors shadow-lg overflow-hidden"
      onClick={handleClick}
    >
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
  );
};

export default RankingCard;
