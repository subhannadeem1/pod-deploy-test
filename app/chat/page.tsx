"use client";

import { useState, type FormEvent, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  IconArrowRight,
  IconExternalLink,
  IconLayoutSidebar,
  IconMessageCirclePlus,
  IconSearch,
} from "@tabler/icons-react";
import SidebarHistory from "@/components/SidebarHistory";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site-footer";

// Define types for episodes and history items
type EpisodeResult = {
  podcast_id: string;
  episode_number: number;
  episode_title: string | null;
  episode_date: string | null;
  podcast_image: string | null;
  snippet: string;
  link: string;
};

type HistoryItem = {
  query: string;
  episodes: EpisodeResult[];
  answer: string;
  date: string;
};

// Helper function for retrying fetch calls
async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3
): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        return response;
      }
      throw new Error("API call failed");
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    }
  }
  throw new Error("API call failed after retries");
}

function EpisodeSkeleton() {
  return (
    <div className="animate-pulse flex flex-row gap-4 sm:gap-6 bg-[#0d181f] p-2 sm:p-4 rounded-lg shadow-md">
      <div className="flex-shrink-0 w-20 h-20 sm:w-32 sm:h-32 bg-gray-700 rounded-[5px] sm:rounded-md" />
      <div className="flex-1 py-1 space-y-2 sm:space-y-4">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 block sm:hidden pb-1 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
        <div className="hidden sm:block h-3 bg-gray-700 rounded w-full"></div>
        <div className="hidden sm:block h-3 bg-gray-700 rounded w-5/6"></div>
      </div>
    </div>
  );
}

export default function TestChatbot() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [answer, setAnswer] = useState("");
  const [episodes, setEpisodes] = useState<EpisodeResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingEpisodes, setLoadingEpisodes] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(
    initialQuery === "" ? true : false
  );
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(!initialQuery); // Hide search bar if initialQuery exists
  const [currentQuery, setCurrentQuery] = useState("");
  const suggestedQuestions = [
    "What has Donald Trump said about tariffs?",
    "How does fine-tuning improve AI models?",
    "Give me a summary of episode 457 of the Lex Fridman Podcast",
  ];

  useEffect(() => {
    if (initialQuery) {
      setCurrentQuery(initialQuery); // Display the initial query immediately
      handleSubmit({
        preventDefault: () => {},
      } as FormEvent);
    }
  }, [initialQuery]);

  // Load history from localStorage on mount
  useEffect(() => {
    const storedHistory = localStorage.getItem("PG_HISTORY");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("PG_HISTORY", JSON.stringify(history));
  }, [history]);

  // Reload the page once on first load to ensure the latest version
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!sessionStorage.getItem("hasReloaded")) {
        sessionStorage.setItem("hasReloaded", "true");
        window.location.reload();
      }
    }
  }, []);

  const handleNewChat = () => {
    setQuery("");
    setAnswer("");
    setEpisodes([]);
    setCurrentQuery(""); // Reset current query
    setIsSearchBarVisible(true); // Show search bar again
    setShowSuggestions(true);
  };

  const handleSubmit = async (e: FormEvent, overrideQuery?: string) => {
    e.preventDefault();
    setShowSuggestions(false); // Hides suggestions after user submits a query
    setLoading(true);
    setLoadingEpisodes(false); // Ensure episodes loading starts false
    setError("");
    setAnswer("");
    setEpisodes([]);

    // Use the override query if provided, otherwise use the state query
    const queryToUse = overrideQuery || query;

    // Immediately display the user's query at the top right
    setCurrentQuery(queryToUse);
    setIsSearchBarVisible(false); // Hide the search bar immediately after submission

    try {
      // Step 1: Fetch answer (one-shot, no stream)
      const answerRes = await fetchWithRetry("/api/chatbot/query-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse }),
      });

      if (!answerRes.ok) {
        const errData = await answerRes.json();
        throw new Error(errData.error || "Error from answer endpoint");
      }

      // read full JSON, no getReader loop
      const answerData = await answerRes.json();
      setAnswer(answerData.answer.trim());
      setLoading(false);

      // Step 2: Fetch episodes with retry after answer is complete
      setLoadingEpisodes(true);
      const episodesRes = await fetchWithRetry("/api/chatbot/query-episodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryToUse }),
      });

      if (!episodesRes.ok) {
        const errData = await episodesRes.json();
        throw new Error(errData.error || "Error from episodes endpoint");
      }

      const episodesData = await episodesRes.json();
      setEpisodes(episodesData.episodes || []);
      setLoadingEpisodes(false);

      // Save to history with full answer and episodes
      const newHistoryItem: HistoryItem = {
        query: queryToUse,
        episodes: episodesData.episodes || [],
        answer: answerData.answer.trim(),
        date: new Date().toLocaleString(),
      };
      setHistory([newHistoryItem, ...history]);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
      setLoadingEpisodes(false);
    }
  };

  // Handle history selection
  const handleSelectHistory = (item: HistoryItem) => {
    setQuery(item.query);
    setAnswer(item.answer);
    setEpisodes(item.episodes);
    setCurrentQuery(item.query); // Display selected query
    setIsSearchBarVisible(false); // Hide search bar when selecting history
  };

  // Clear history
  const handleClearHistory = () => {
    if (confirm("Are you sure you want to clear the query history?")) {
      setHistory([]);
      localStorage.removeItem("PG_HISTORY");
    }
  };

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-y-auto bg-[#04080B] text-[#C9D1D9]">
        {/* Sidebar with History */}
        {sidebarVisible && (
          <SidebarHistory
            history={history}
            handleSelectHistory={handleSelectHistory}
            handleClearHistory={handleClearHistory}
            handleNewChat={handleNewChat}
            isMobileOpen={isMobileOpen}
            setIsMobileOpen={setIsMobileOpen}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-2">
          <div className="flex-1 flex flex-col items-center overflow-y-auto justify-start border-b-0 border rounded-t-[15px] bg-[#0A1016] border-[#17212A] pb-10 mt-24">
            <div className="flex items-center sticky top-0 z-10 px-5 w-full min-h-[50px] h-[50px] border-b rounded-t-[15px] border-[#17212A] justify-between bg-[#0A1016]/70 backdrop-blur-md">
              <button
                onClick={() => {
                  // For desktop, toggle sidebar visibility
                  if (window.innerWidth >= 1024) {
                    setSidebarVisible((prev) => !prev);
                  }
                  // For mobile, open the sheet
                  else {
                    setIsMobileOpen(true);
                  }
                }}
                className="text-[#96A9B6] hover:text-white transition-colors"
                aria-label="Toggle sidebar"
              >
                <IconLayoutSidebar stroke={2} className="w-5 h-5" />
              </button>

              <button
                onClick={handleNewChat}
                disabled={loading || loadingEpisodes}
                className="flex gap-[6px] items-center text-[#96A9B6] hover:text-white transition-colors disabled:cursor-not-allowed disabled:text-[#96A9B6] "
              >
                <IconMessageCirclePlus stroke={2} className="w-5 h-5" />
                <h1 className="text-sm font-medium">New chat</h1>
              </button>
            </div>

            <div className="w-full max-w-4xl space-y-8">
              {/* Display the user's query at the top right immediately */}
              {currentQuery && (
                <div className="flex justify-end mx-4 mt-7">
                  <div className="  text-[14px] sm:text-[16px] text-white  bg-[#0d181f] p-2 sm:p-4 rounded-lg shadow-md max-w-[300px] md:max-w-[430px] inline-block">
                    {currentQuery}
                  </div>
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center text-center text-red-500 mb-4 mt-60">
                  <p className="mb-2">
                    Something went wrong. Please try again.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* Answer Section with Loading Effect */}
              {(loading || answer) && (
                <div className="mt-6 pl-3 sm:pl-0">
                  <div className="flex items-start">
                    <img
                      src="/download.gif"
                      alt="Chatbot"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                    />
                    <div className="flex-1 sm:p-4 p-3 pt-4">
                      {loading && !answer ? (
                        <div className="pt-1">
                          <div className="flex items-center space-x-2">
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-[14px] sm:text-[16px]">
                          <ReactMarkdown>{answer}</ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Related Episodes Section */}
              {loadingEpisodes && episodes.length === 0 && (
                <div className="mt-6 px-4 sm:px-0">
                  <h2 className="text-[24px] font-semibold text-[#97a9b6]">
                    Related Podcast Episodes
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {[...Array(3)].map((_, index) => (
                      <EpisodeSkeleton key={index} />
                    ))}
                  </div>
                </div>
              )}

              {!loadingEpisodes && episodes.length > 0 && (
                <div className="mt-6 px-4 sm:px-0">
                  <h2 className="text-[24px] font-semibold text-[#97a9b6]">
                    Related Podcast Episodes
                  </h2>
                  <div className="mt-4 grid grid-cols-1 gap-4">
                    {episodes.map((ep) => (
                      <a
                        href={ep.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={`${ep.podcast_id}-${ep.episode_number}`}
                        className="block"
                      >
                        <div className="flex flex-row gap-4 sm:gap-6 bg-[#0d181f] p-2 sm:p-4 rounded-lg shadow-md hover:bg-[#141e26] transition-colors duration-200">
                          {ep.podcast_image && (
                            <div className="flex-shrink-0 sm:w-32 w-20 h-20 sm:h-32 relative">
                              <Image
                                src={ep.podcast_image || "/placeholder.svg"}
                                alt={ep.episode_title || "Episode"}
                                fill
                                className="rounded-[5px] sm:rounded-md"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="text-[16px] sm:text-[20px] font-bold text-[#97a9b6] line-clamp-2 sm:line-clamp-1">
                                  {ep.episode_title ||
                                    `Episode ${ep.episode_number}`}
                                </h3>
                                <p className="text-sm pt-1 text-[#8B949E]">
                                  {ep.episode_date
                                    ? new Date(
                                        ep.episode_date
                                      ).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })
                                    : "No date info"}
                                </p>
                              </div>
                              <a
                                href={ep.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#97a9b6] hover:text-[#fbfcfc] transition-colors duration-200"
                                aria-label={`Go to episode ${
                                  ep.episode_title || "Untitled"
                                }`}
                              >
                                <IconExternalLink className="w-5 h-5" />
                              </a>
                            </div>
                            <p className="mt-2 hidden  text-[#C9D1D9] sm:line-clamp-3">
                              {ep.snippet || "No snippet available"}
                            </p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search Bar - Hidden After Submission */}
          {isSearchBarVisible && (
            <div className="mt-auto w-full bg-[#0A1016] px-4 border-l border-r py-4 border-[#17212A]">
              {showSuggestions && (
                <div className="mb-10 items-center flex flex-col px-4 md:px-10">
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(question);
                          handleSubmit(
                            { preventDefault: () => {} } as FormEvent,
                            question
                          );
                        }}
                        className="w-full flex items-center gap-2 text-[12px] sm:text-[16px] text-left text-[#546069] hover:text-white"
                      >
                        <IconArrowRight className="w-4 h-4" />
                        <span>{question}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <motion.form
                onSubmit={handleSubmit}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center rounded-full bg-[#11212C] mx-0 sm:mx-10 px-3 sm:px-4 py-2">
                  <IconSearch className="w-5 h-5 text-[#97a9b6] mr-2" />
                  <input
                    className="flex-1 bg-transparent text-[#C9D1D9] text-[16px] placeholder-[#8B949E] focus:outline-none"
                    type="text"
                    placeholder="Type your question here..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    required
                    aria-label="Search query"
                  />
                  <Button
                    type="submit"
                    className="ml-2 bg-[#97a9b6] hover:bg-[#C9D1D9] text-white p-2 rounded-full transition-colors duration-200"
                    aria-label="Submit query"
                    disabled={!query.trim() || loading || loadingEpisodes}
                  >
                    <IconArrowRight className="w-5 h-5" />
                  </Button>
                </div>
              </motion.form>
            </div>
          )}
        </div>
      </div>
      <SiteFooter />
    </>
  );
}