"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Marquee from "../magicui/marquee";
//import RetroGrid from "../magicui/retro-grid";

import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useTypingEffect } from "../magicui/useTypingEffect";

import { cn } from "@/lib/utils";
import { featuredPodcasts } from "@/app/data/featured/featured";
import { toast, Toaster } from "sonner";

export default function Hero() {
  const router = useRouter();
  const fadeInRef = useRef<HTMLHeadingElement>(null);
  const fadeInInView = useInView(fadeInRef, { once: true });

  const fadeUpVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  // State for the search input
  const [searchQuery, setSearchQuery] = useState("");

  // Typing Effect for Placeholder
  const placeholderTexts = [
    "What has Trump said about tariffs?",
    "What are some protocols for improving sleep?",
    "What are Bobby Lee's favorite restaurants in LA?",
    "What are the benefits of cold exposure or ice baths?",
    "What ethical issues arise in neural interfaces?",
    "What are the best protocols for reducing anxiety?",
    "What is the science of habit formation?",
    "How does dopamine impact motivation and focus?",
    "How do transformers process long-term context?",
    "How does fine-tuning improve AI models?",
    "What are the pros and cons of RL in robotics?",
    "How is AI used in protein folding?",
  ];
  const animatedPlaceholder = useTypingEffect(placeholderTexts, 75, 50, 2000);

  // Handler for form submission
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      toast("Please enter a search query.");
      return;
    }
    router.push(`/chat?query=${encodeURIComponent(searchQuery)}`);
  };

  // ——— Crossfade loop between forward + reversed videos ———
  const videoSrcs = ["/libraryone.mp4", "/libraryone-reverse.mp4"];
  const videoRefs = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const [activeIndex, setActiveIndex] = useState(0);

  // Attach 'ended' listeners to swap index
  useEffect(() => {
    const handlers = videoRefs.map((ref) => {
      const v = ref.current;
      if (!v) return null;
      const handler = () => setActiveIndex((prev) => 1 - prev);
      v.addEventListener("ended", handler);
      return { v, handler };
    });

    return () => {
      handlers.forEach((h) => {
        if (h) h.v.removeEventListener("ended", h.handler);
      });
    };
  }, []);

  // On index change, play the next and fade out the previous after 1s
  useEffect(() => {
    const next = videoRefs[activeIndex].current;
    const prev = videoRefs[1 - activeIndex].current;
    if (next) {
      next.currentTime = 0;
      next.play();
    }
    if (prev) {
      setTimeout(() => prev.pause(), 1000);
    }
  }, [activeIndex]);

  return (
    <section id="hero" data-nosnippet>
      <div className="bg-[#efe9df] relative h-screen overflow-hidden pt-14">
        {/* Video Background */}
        {videoSrcs.map((src, idx) => (
          <video
            key={idx}
            ref={videoRefs[idx]}
            src={src}
            muted
            playsInline
            preload="auto"
            autoPlay={activeIndex === idx}
            poster={idx === 0 ? "/ideological-bias.webp" : undefined}
            className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ease-in-out ${
              activeIndex === idx ? "opacity-80" : "opacity-0"
            }`}
          />
        ))}

        <div className="z-10 flex flex-col w-full">
          <div className="mt-28 md:mt-36 lg:mt-16 z-20 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.h1
                ref={fadeInRef}
                className="text-white bg-clip-text pt- md:pt-0 font-sans font-semibold leading-tight tracking-tight text-[40px]  sm:text-6xl md:text-7xl lg:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-md"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                Unlock the Power <br /> of Podcasts <br />
              </motion.h1>

              <motion.p
                className="text-white font-semibold  mx-4 tracking-wide text-[13px] md:text-[18px] leading-relaxed font-mono"
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                Explore, learn, and get answers directly from the podcasts you
                love
              </motion.p>

              <motion.form
                onSubmit={handleSearch}
                animate={fadeInInView ? "animate" : "initial"}
                variants={fadeUpVariants}
                className="w-full max-w-lg"
                initial={false}
                transition={{
                  duration: 0.6,
                  delay: 0.3,
                  ease: [0.21, 0.47, 0.32, 0.98],
                  type: "spring",
                }}
              >
                <div className="relative group mx-4 rounded-full overflow-hidden bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 shadow-lg">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={fadeInInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="absolute inset-y-0 left-0 pl-2 md:pl-4 flex items-center pointer-events-none"
                  >
                    <IconSearch className="w-5 h-5 text-gray-600 transition-transform duration-200 group-hover:scale-110" />
                  </motion.div>

                  <input
                    className="block w-full bg-white border-none rounded-full text-[16px] py-3 px-9 md:pl-12 md:pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out gradient-placeholder text-gray-800 font-light"
                    type="text"
                    placeholder={animatedPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search podcasts"
                  />

                  <motion.button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-2 md:pr-4 flex items-center justify-center text-gray-700 rounded-full bg-transparent transition-colors duration-300 ease-in-out hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={fadeInInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    aria-label="Submit search"
                  >
                    <IconArrowRight className="w-5 h-5 transition-transform duration-300 ease-in-out transform hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>

          <motion.div
            animate={fadeInInView ? "animate" : "initial"}
            variants={fadeUpVariants}
            initial={false}
            transition={{
              duration: 0.6,
              delay: 0.4,
              ease: [0.21, 0.47, 0.32, 0.98, 1.52],
              type: "spring",
            }}
            className="mx-auto mt-16 md:mt-20"
          >
            <div
              className={cn(
                "absolute inset-0 bottom-1/2 h-full w-full transform-gpu [filter:blur(120px)]",
                "[background-image:linear-gradient(to_bottom, #ffbd7a, transparent_40%)]"
              )}
            />
            <Marquee className="[--duration:120s] bg-[#efe9df] w-screen mx-auto h-100 bg-transparent overflow-x-scroll scrollbar scrollbar-transparent">
              <div className="flex gap-4 sm:gap-12 pb-12 sm:pb-8">
                {featuredPodcasts?.map((podcast) => (
                  <div className="w-40 md:w-60 h-40 md:h-60" key={podcast.id}>
                    <Link href={`/podcast/${encodeURIComponent(podcast.alias)}`}>
                      <Image
                        src={podcast.image}
                        alt={podcast.name}
                        width={220}
                        height={220}
                        className="hover:scale-110 rounded-[10px] transition-transform duration-300 opacity-75"
                      />
                      <h4 className="text-[12px] sm:text-md mt-2  text-white font-medium">
                        {podcast.name}
                      </h4>
                    </Link>
                  </div>
                ))}
              </div>
            </Marquee>
          </motion.div>
        </div>
      </div>

      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl mt-12",
          style: {
            background:
              "linear-gradient(to right, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.15))",
            backdropFilter: "blur(8px)",
            border: "2px solid transparent",
            borderRadius: "14px",
            backgroundClip: "padding-box",
            WebkitBackgroundClip: "padding-box",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",
            color: "#2F2F2F",
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",
            padding: "12px 20px",
            fontWeight: 500,
          },
        }}
      />
    </section>
  );
}
