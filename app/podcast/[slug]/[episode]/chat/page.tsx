"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchTitle } from "@/utils/fetch-title";
import { TranscriptURL } from "@/types/TranscriptURL";
import { podcastTitles } from "@/app/data/general/pod-data";

/** ------------------------------------------------------------------
 *  LoadingDots: Simple animated dots to show AI is "thinking"
 *  ----------------------------------------------------------------- */
function LoadingDots() {
  return (
    <div className="flex space-x-2 items-center">
      <div className="w-2.5 h-2.5 bg-[#10A37F] rounded-full animate-bounce delay-100"></div>
      <div className="w-2.5 h-2.5 bg-[#10A37F] rounded-full animate-bounce delay-200"></div>
      <div className="w-2.5 h-2.5 bg-[#10A37F] rounded-full animate-bounce delay-300"></div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  ChatHeader: Displays the "Back to episode" link and episode title
 *  ----------------------------------------------------------------- */
function ChatHeader({ slug, episode }: { slug: string; episode: string }) {
  return (
    <div>
      <nav aria-label="Back" className="flex items-center space-x-2 group pb-2">
        <a
          href={`/podcast/${encodeURIComponent(slug)}/${encodeURIComponent(episode)}`}
          className="flex items-center text-sm text-gray-300 hover:text-[#10A37F] transition-colors"
        >
          {/* Left Arrow Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 text-gray-400 group-hover:text-[#10A37F] transition-colors"
          >
            <path
              fillRule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clipRule="evenodd"
            />
          </svg>
          <span className="ml-2">Back to the episode</span>
        </a>
      </nav>

      <h1 className="text-lg font-bold text-white mb-4 pl-6 ml-1">
        {fetchTitle(slug)?.get(episode)}
      </h1>

      <div className="border-t border-gray-700 mb-4" />

      {/* Intro */}
      <div className="text-xs text-gray-300 text-center mb-4">
        <p>
          Chatting with{" "}
          <span className="font-semibold text-[#10A37F]">AI chatbot</span> trained on the content of{" "}
          <span className="font-semibold">
            {podcastTitles.get(slug)} #{episode}
          </span>
        </p>
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  ChatBubble: Renders a single message bubble from AI or the user
 *  ----------------------------------------------------------------- */
function ChatBubble({ text, sender }: { text: string; sender: "ai" | "user" }) {
  // Decide if the message bubble is from AI or the user
  const isAI = sender === "ai";

  return (
    <div className={`flex items-start ${!isAI ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 flex justify-center items-center text-lg mr-3 ml-3 rounded-full
          ${isAI ? "bg-[#10A37F] text-black" : "bg-[#10A37F] text-black"}
        `}
      >
        {isAI ? (
          // AI "bars" icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            fill="none"
            className="w-6 h-6"
          >
            <rect x="12" y="28" width="4" height="8" fill="currentColor" />
            <rect x="20" y="24" width="4" height="16" fill="currentColor" />
            <rect x="28" y="20" width="4" height="24" fill="currentColor" />
            <rect x="36" y="24" width="4" height="16" fill="currentColor" />
            <rect x="44" y="28" width="4" height="8" fill="currentColor" />
          </svg>
        ) : (
          // User "person" icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2C10.343 2 9 3.343 9 5C9 6.657 10.343 8 12 8C13.657 8 15 6.657 15 5C15 3.343 13.657 2 12 2ZM6 14C6 12.343 7.343 11 9 11H15C16.657 11 18 12.343 18 14V16C18 17.657 16.657 19 15 19H9C7.343 19 6 17.657 6 16V14Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Bubble */}
      <div className="max-w-xs p-4 rounded-lg text-sm shadow-none bg-[#343541] text-[#ECECF1]">
        <p>{text}</p>
      </div>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  ChatInput: Handles user message input and the "Send" button
 *  ----------------------------------------------------------------- */
function ChatInput({
  userInput,
  setUserInput,
  onSendMessage,
  disabled,
}: {
  userInput: string;
  setUserInput: (value: string) => void;
  onSendMessage: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex items-center space-x-6 p-6 bg-[#444654]">
      <textarea
        name="message-field"
        id="message-field"
        className="flex-1 h-12 p-3 bg-[#40414F] text-white rounded-lg
          focus:outline-none focus:ring-2 focus:ring-[#10A37F]
          resize-none transition-all duration-300 placeholder-gray-400"
        placeholder="Type your message..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button
        type="button"
        onClick={onSendMessage}
        disabled={disabled}
        className={`px-6 py-3 bg-[#10A37F] text-black rounded-lg
          hover:bg-[#15b085] transition-all duration-300
          focus:outline-none focus:ring-2 focus:ring-[#10A37F]
          ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {/* Send Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z"
          />
        </svg>
      </button>
    </div>
  );
}

/** ------------------------------------------------------------------
 *  Main Chat Page
 *  ----------------------------------------------------------------- */
export default function Page(url: TranscriptURL) {
  const [messages, setMessages] = useState<{ text: string; sender: "ai" | "user" }[]>([
    {
      text: "Hi! I can help you find podcast episodes and insights. What are you looking for today?",
      sender: "ai",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Set the page title & meta (in a client component, it modifies document head)
  useEffect(() => {
    document.title = "The Pod Transcripts - AI Chat";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "The Pod Transcripts - AI Chat");
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle user sending a message
  const handleSendMessage = useCallback(() => {
    if (userInput.trim() === "") return;
    
    // Add user's message
    setMessages((prev) => [...prev, { text: userInput, sender: "user" }]);
    setUserInput("");

    // Show loading dots where the next AI message will appear
    setLoadingIndex(messages.length);
    setIsLoading(true);

    // Simulate an AI response after 2 seconds
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "Support for chat coming soon...", sender: "ai" }]);
      setIsLoading(false);
      setLoadingIndex(null);
    }, 2000);
  }, [userInput, messages]);

  return (
    <div className="pt-24 min-h-screen bg-[#343541] text-white flex flex-col">
      {/* Centered wrapper for the chat area */}
      <div className="w-full max-w-3xl mx-auto px-6">
        <div className="bg-[#444654] rounded-lg shadow-md overflow-hidden">

          {/* HEADER */}
          <div className="p-6">
            <ChatHeader
              slug={url.params.slug}
              episode={url.params.episode}
            />

            {/* MESSAGES */}
            <div
              ref={chatContainerRef}
              className="flex flex-col space-y-4 overflow-y-auto p-4 h-[400px]"
            >
              {/* Existing messages */}
              {messages.map((message, index) => (
                <ChatBubble key={index} text={message.text} sender={message.sender} />
              ))}

              {/* Always keep a ref on the last message for auto scroll */}
              <div ref={lastMessageRef} />

              {/* Loading Dots (AI "thinking") */}
              {isLoading && loadingIndex === messages.length - 1 && (
                <div className="flex items-start">
                  <LoadingDots />
                </div>
              )}
            </div>
          </div>

          {/* INPUT SECTION */}
          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
