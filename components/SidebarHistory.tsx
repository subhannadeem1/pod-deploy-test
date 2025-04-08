"use client";

import { IconHistory, IconMessage, IconTrash } from "@tabler/icons-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { X } from "lucide-react";

export type HistoryItem = {
  query: string;
  episodes: {
    podcast_id: string;
    episode_number: number;
    episode_title: string | null;
    episode_date: string | null;
    podcast_image: string | null;
    snippet: string;
    link: string;
  }[];
  answer: string;
  date: string;
};

interface SidebarHistoryProps {
  history: HistoryItem[];
  handleSelectHistory: (item: HistoryItem) => void;
  handleClearHistory: () => void;
  handleNewChat: () => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (open: boolean) => void;
}

export default function SidebarHistory({
  history,
  handleSelectHistory,
  handleClearHistory,
  handleNewChat,
  isMobileOpen,
  setIsMobileOpen,
}: SidebarHistoryProps) {
  // The sidebar content that will be used in both desktop and mobile views
  const SidebarContent = ({ isMobile = false }) => (
    <div className="flex flex-col h-full relative">
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen?.(false)}
          className="absolute right-0 top-0 text-white opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <div>
        <button
          onClick={() => {
            handleNewChat();
            // Close mobile sidebar when chat button is clicked
            if (setIsMobileOpen) setIsMobileOpen(false);
          }}
          className=" mt-6 sm:mt-2 w-full flex items-center justify-between text-[#718491] hover:text-white p-2 hover:bg-[#141e26] rounded-md"
        >
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-[#15222A] flex justify-center border rounded-md border-[#0C171F] items-center">
              <IconMessage stroke={2} className="h-5 w-5" />
            </div>
            <h2 className="text-[16px] py-1 font-medium">Chat</h2>
          </div>
        </button>

        <div className="mt-2 flex items-center justify-between text-[#718491] hover:text-white mb-4 p-2 hover:bg-[#141e26] rounded-md">
          <div className="flex gap-2 ">
            <div className="h-8 w-8 bg-[#15222A] flex justify-center border rounded-md border-[#0C171F] items-center">
              <IconHistory stroke={2} className="h-5 w-5" />
            </div>

            <h2 className="text-[16px] py-1 font-medium">History</h2>
          </div>

          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="hover:text-[#FF7B72] transition-colors duration-200"
              aria-label="Clear History"
            >
              <IconTrash className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="border-b-[1px] border-[#17212A] mt-6 mb-10" />
        {history.length === 0 ? (
          <p className="text-[#8B949E]">No previous queries.</p>
        ) : (
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {history.map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    handleSelectHistory(item);
                    // Close mobile sidebar when an item is selected
                    if (setIsMobileOpen) setIsMobileOpen(false);
                  }}
                  className="w-full text-left bg-[#0C171F] hover:bg-[#141e26] rounded-md p-3 transition-colors duration-200"
                  aria-label={`Repopulate query: ${item.query}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#C9D1D9] truncate flex-1 mr-2">
                      {item.query}
                    </span>
                    <span className="text-xs text-[#8B949E] whitespace-nowrap">
                      {item.date}
                    </span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar - conditionally rendered */}
      <div className="hidden lg:flex lg:w-1/3 xl:w-1/4 border-t-[1px] border-r-[1px] rounded-tr-[15px] border-[#17212A] pb-10 mt-24 bg-[#04080B] p-6 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile sidebar as Sheet - only rendered when needed */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent
          side="left"
          className="w-[320px] sm:w-[350px] border-r-[1px] border-[#17212A] bg-[#04080B] p-4 pt-6"
        >
          <SidebarContent isMobile={true} />
        </SheetContent>
      </Sheet>
    </>
  );
}
