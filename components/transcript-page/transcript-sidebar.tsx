import HostsComponent from "./hosts";
import SocialMediaComponent from "./social-media";

// General
import {
  podcastDescriptions,
  podcastImages,
  podcastTitles,
} from "@/app/data/general/pod-data";
import { podcastHostSocialMediaLinks } from "@/app/data/general/social-media-data";

const TranscriptSidebarComponent = (props: any) => {
  const { slug } = props;

  return (
    <div className="md:col-start-1 md:row-end-1 pl-4">
      <div className="flex flex-row md:flex-col gap-x-4 gap-y-5">
        {/* Podcast Image */}
        <div className="flex-shrink-0">
          <a href={`/podcast/${encodeURIComponent(slug)}`}>
            <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg overflow-hidden">
              <img
                src={podcastImages.get(slug)}
                className="w-28 sm:w-36 md:w-full aspect-square"
                alt={podcastTitles.get(slug) || "Podcast"}
              />
            </div>
          </a>
        </div>

        {/* Podcast Title and Description */}
        <div className="text-left md:text-center">
          <a href={`/podcast/${encodeURIComponent(slug)}`}>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-white font-semibold">
              {podcastTitles.get(slug)}
            </h2>
          </a>
          <p className="mt-2 text-sm sm:text-base text-white/80 line-clamp-3 sm:line-clamp-4 md:line-clamp-none">
            {podcastDescriptions.get(slug)}
          </p>
          <HostsComponent slug={slug} />
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="mt-6 mb-0 md:mb-6 justify-center">
        {podcastHostSocialMediaLinks.get(slug)?.map((host, idx) => (
          <a href={"" + host.split(",,,")[1]} target="_blank" key={idx}>
            <button className="w-full px-3 py-2 mb-2 text-sm font-medium text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-md hover:shadow-lg hover:bg-white/20 transition-all duration-300">
              Follow {"" + host.split(",,,")[0]}
            </button>
          </a>
        ))}
      </div>

      <SocialMediaComponent slug={slug} />
    </div>
  );
};

export default TranscriptSidebarComponent;