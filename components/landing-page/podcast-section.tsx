"use client";

import Image from "next/image";

import { PodcastType } from "@/types/PodcastType";

export default function PodcastSection({ id, name, host, image, alias }: PodcastType) {
  return (
    <div className="flex gap-5 text-[#efe9df]">
      <Image
        className="lg:w-[120px] lg:h-[120px] md:w-[120px] sm:w-[80px] w-[60px] md:h-[120px] sm:h-[80px] h-[60px] opacity-90 rounded-md"
        width={80}
        height={80}
        src={image}
        alt={name}
      />
      <div>
        <h3 className="md:text-lg text-base font-semibold text-white opacity-80">
          {name}
        </h3>
        <p className="md:text-base text-sm font-light text-white opacity-70">
          {host}
        </p>
      </div>
    </div>
  );
}