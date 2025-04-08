"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Marquee from "../magicui/marquee";
import RetroGrid from "../magicui/retro-grid";

import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import { useTypingEffect } from "../magicui/useTypingEffect";

import { cn } from "@/lib/utils";
import { featuredPodcasts } from "@/app/data/featured/featured";
import { toast, Toaster } from "sonner";

export default function Hero() {
  const router = useRouter();
  const fadeInRef = useRef(null);
  const fadeInInView = useInView(fadeInRef, { once: true });

  const fadeUpVariants = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  };

  // State for the search input
  const [searchQuery, setSearchQuery] = useState("");

  // Typing Effect for Placeholder
  const placeholderTexts = [
    "What has Donald Trump said about tariffs?",
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

    // Navigate to the chat page with the search query as a query parameter
    router.push(`/chat?query=${encodeURIComponent(searchQuery)}`);

    // Optionally, remove or comment out the toast if not needed
    // toast("Oops - OpenAI embeddings monthly spend cap reached!");
  };

  return (
    <section id="hero" data-nosnippet>
      <div className="bg-[#efe9df] relative h-full overflow-hidden pt-14">
        <RetroGrid className="z-0" />
        <div className="z-10 flex flex-col w-full">
          <div className="mt-0 md:mt-20 z-20 grid grid-cols-1">
            <div className="flex flex-col items-center gap-6 text-center">
              <motion.h1
                ref={fadeInRef}
                className="text-black bg-clip-text pt-6 md:pt-0 text-3xl font-sans leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-6xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 drop-shadow-md"
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

              <div className="opacity-60">
                <motion.p
                  className="text-balance text-xs tracking-wide text-black md:text-lg leading-relaxed font-serif"
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
                  Ask Anything and Gain Insights Directly from Your Favorite Podcasts
                </motion.p>
              </div>

              {/* Enhanced Search Bar */}
              <motion.form
                onSubmit={handleSearch} // ← Updated to use new handleSearch
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
                <div className="relative group rounded-full overflow-hidden bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg border border-gray-200 shadow-lg">
                  {/* Search Icon */}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={fadeInInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  >
                    <IconSearch className="w-5 h-5 text-gray-600 transition-transform duration-200 group-hover:scale-110" />
                  </motion.div>

                  {/* Input Field */}
                  <input
                    className="block w-full bg-transparent border-none rounded-full py-3 pl-12 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out gradient-placeholder text-gray-800 font-light"
                    type="text"
                    placeholder={animatedPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search podcasts"
                  />

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center justify-center text-gray-700 rounded-full bg-transparent transition-colors duration-300 ease-in-out hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-bold"
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
            className="mx-auto mt-2 md:mt-10"
          >
            <div
              className={cn(
                "absolute inset-0 bottom-1/2 h-full w-full transform-gpu [filter:blur(120px)]",
                "[background-image:linear-gradient(to_bottom, #ffbd7a, transparent_40%)]"
              )}
            />
            <Marquee className="[--duration:120s] bg-[#efe9df] w-screen mx-auto h-100 bg-transparent opacity-70 overflow-x-scroll scrollbar scrollbar-transparent">
              <div className="flex gap-4 sm:gap-12 pb-12 sm:pb-8">
                {featuredPodcasts?.map((podcast) => (
                  <div className="w-20 sm:w-60 h-12 sm:h-60" key={podcast.id}>
                    <Link href={`/podcast/${encodeURIComponent(podcast.alias)}`}>
                      <Image
                        src={podcast.image}
                        alt={podcast.name}
                        width={220}
                        height={220}
                        className="hover:scale-110 transition-transform duration-300"
                      />
                      <h4 className="text-xs sm:text-md mt-2 hidden sm:block text-gray-800 font-medium">
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

      {/* Slightly more interesting glass style: gradient border & text glow */}
      <Toaster
        position="top-center"
        toastOptions={{
          className:
            "transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl mt-12",
          style: {
            // Subtle gradient background
            background: "linear-gradient(to right, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.15))",
            // Frosted-glass blur
            backdropFilter: "blur(8px)",
            // Subtle gradient border
            border: "2px solid transparent",
            borderRadius: "14px",
            backgroundClip: "padding-box",
            WebkitBackgroundClip: "padding-box",

            // Outline gradient trick (giving a slight rainbow or color accent)
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.15)",

            // Darker text for readability
            color: "#2F2F2F",

            // Added glow to text
            textShadow: "0 1px 2px rgba(255, 255, 255, 0.5)",

            padding: "12px 20px",
            fontWeight: 500,
          },
        }}
      />
    </section>
  );
}