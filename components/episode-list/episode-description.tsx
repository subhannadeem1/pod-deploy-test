import React from "react";
import { BsSpotify, BsYoutube } from "react-icons/bs";
import { SiApplepodcasts } from "react-icons/si";
import {
  podcastDescriptions,
  podcastHosts,
  podcastImages,
  podcastTitles,
} from "@/app/data/general/pod-data";
import {
  podcastAppleLinks,
  podcastSpotifyLinks,
  podcastYoutubeLinks,
} from "@/app/data/general/social-media-data";

interface EpisodeDescriptionProps {
  slug: string;
}

const EpisodeDescription: React.FC<EpisodeDescriptionProps> = ({ slug }) => {
  const SocialLink = ({
    link,
    icon: Icon,
    name,
  }: {
    link: string;
    icon: React.ElementType;
    name: string;
  }) =>
    link ? (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="relative group md:px-6 flex-1 md:flex-none px-3 py-2 md:py-3 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-110"
        aria-label={`Follow on ${name}`}
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/40 via-indigo-400/30 to-purple-600/20 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Inner Glow and Blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-gray-800/40 to-black/20 backdrop-blur-md border border-white/10 rounded-lg"></div>
        <div className="relative z-10 flex items-center gap-2">
          <Icon className="h-6 w-6 text-white drop-shadow-md" />
          <span className="text-[12px] md:text-[14px] font-semibold text-white drop-shadow-sm">
            {name}
          </span>
        </div>
      </a>
    ) : null;

  return (
    <div className="p-4 bg-gradient-to-br from-black/60 via-gray-900/70 to-black/50 backdrop-blur-lg border border-[#17212A] shadow-2xl rounded-xl overflow-hidden">
      <div className="gap-4 lg:gap-6 flex flex-row">
        {/* Podcast Image */}
        <div className="relative flex-shrink-0">
          <div className="w-full ">
            <img
              src={podcastImages.get(slug) || "/placeholder-image.png"}
              alt={`${podcastTitles.get(slug) || "Podcast"} cover`}
              className="h-28 w-28 md:w-[230px] md:h-[220px] rounded-lg object-cover"
            />
          </div>
          <div className="absolute hidden top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {podcastTitles.get(slug)?.toUpperCase() || "UNTITLED"}
          </div>
        </div>

        {/* Podcast Details */}
        <div className="md:w-3/4 lg:p-0 flex flex-col justify-between">
          <div className="space-y-1 lg:space-y-2">
            <h2 className="text-[16px] md:text-2xl line-clamp-1 font-extrabold text-white tracking-tight">
              {podcastTitles.get(slug) || "Title Not Available"}
            </h2>
            <p className="text-[14px]  line-clamp-1 font-medium text-gray-300">
              {podcastHosts.get(slug) || "Unknown Host"}
            </p>
            <p className="text-[14px] lg:text-base text-gray-200 leading-relaxed line-clamp-3">
              {podcastDescriptions.get(slug) || "No description available."}
            </p>
          </div>

          {/* Social Media Links */}
          <div className="hidden md:block">
            <div className="mt-4 flex flex-wrap gap-4">
              <SocialLink
                link={podcastYoutubeLinks.get(slug) || ""}
                icon={BsYoutube}
                name="YouTube"
              />
              <SocialLink
                link={podcastSpotifyLinks.get(slug) || ""}
                icon={BsSpotify}
                name="Spotify"
              />
              <SocialLink
                link={podcastAppleLinks.get(slug) || ""}
                icon={SiApplepodcasts}
                name="Apple"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="block md:hidden">
        <div className="mt-4 flex flex-1 gap-2">
          <SocialLink
            link={podcastYoutubeLinks.get(slug) || ""}
            icon={BsYoutube}
            name="YouTube"
          />
          <SocialLink
            link={podcastSpotifyLinks.get(slug) || ""}
            icon={BsSpotify}
            name="Spotify"
          />
          <SocialLink
            link={podcastAppleLinks.get(slug) || ""}
            icon={SiApplepodcasts}
            name="Apple"
          />
        </div>
      </div>
    </div>
  );
};

export default EpisodeDescription;
