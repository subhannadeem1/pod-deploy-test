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
        className="relative group px-6 py-3 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-110"
        aria-label={`Follow on ${name}`}
      >
        {/* Outer Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-400/40 via-indigo-400/30 to-purple-600/20 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* Inner Glow and Blur */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-gray-800/40 to-black/20 backdrop-blur-md border border-white/10 rounded-lg"></div>
        <div className="relative z-10 flex items-center gap-2">
          <Icon className="h-6 w-6 text-white drop-shadow-md" />
          <span className="text-sm font-semibold text-white drop-shadow-sm">
            {name}
          </span>
        </div>
      </a>
    ) : null;

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-black/60 via-gray-900/70 to-black/50 backdrop-blur-lg border border-white/10 shadow-2xl rounded-xl overflow-hidden">
      {/* Podcast Image */}
      <div className="relative md:w-1/4 flex-shrink-0">
        <div className="w-full aspect-square">
          <img
            src={podcastImages.get(slug) || "/placeholder-image.png"}
            alt={`${podcastTitles.get(slug) || "Podcast"} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {podcastTitles.get(slug)?.toUpperCase() || "UNTITLED"}
        </div>
      </div>

      {/* Podcast Details */}
      <div className="md:w-3/4 p-6 flex flex-col justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {podcastTitles.get(slug) || "Title Not Available"}
          </h2>
          <p className="text-sm font-medium text-gray-300">
            {podcastHosts.get(slug) || "Unknown Host"}
          </p>
          <p className="text-base text-gray-200 leading-relaxed line-clamp-3">
            {podcastDescriptions.get(slug) || "No description available."}
          </p>
        </div>

        {/* Social Media Links */}
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
  );
};

export default EpisodeDescription;