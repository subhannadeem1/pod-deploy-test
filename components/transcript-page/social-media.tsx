import { BsInstagram, BsSpotify, BsTwitterX, BsYoutube } from "react-icons/bs";
import {
  podcastYoutubeLinks,
  podcastSpotifyLinks,
  podcastAppleLinks,
  podcastInstagramLinks,
  podcastTwitterLinks,
} from "@/app/data/general/social-media-data";
import { SiApplepodcasts } from "react-icons/si";

const SocialMediaComponent = (props: any) => {
  const { slug } = props;

  return (
    <>
      <div className="flex gap-1 flex-wrap mt-0 md:mt-6 justify-center  w-full ">
        {podcastYoutubeLinks.get(slug) != "" && (
          <a href={podcastYoutubeLinks.get(slug)} target="_blank">
            <BsYoutube className="h-8 w-8 p-2 text-black" />
          </a>
        )}

        {podcastSpotifyLinks.get(slug) != "" && (
          <a href={podcastSpotifyLinks.get(slug)} target="_blank">
            <BsSpotify className="h-8 w-8 p-2 text-black" />
          </a>
        )}

        {podcastAppleLinks.get(slug) != "" && (
          <a href={podcastAppleLinks.get(slug)} target="_blank">
            <SiApplepodcasts className="h-8 w-8 p-2 text-black" />
          </a>
        )}

        {podcastTwitterLinks.get(slug) != "" && (
          <a href={podcastTwitterLinks.get(slug)} target="_blank">
            <BsTwitterX className="h-8 w-8 p-2 text-black" />
          </a>
        )}

        {podcastInstagramLinks.get(slug) != "" && (
          <a href={podcastInstagramLinks.get(slug)} target="_blank">
            <BsInstagram className="h-8 w-8 p-2 text-black" />
          </a>
        )}
      </div>
    </>
  );
};

export default SocialMediaComponent;
