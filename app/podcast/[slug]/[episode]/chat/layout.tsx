import Script from "next/script";
import QueryWrapper from "../../QueryWrapper";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <>
      {/* Google Ad Script */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5058851609859176"
        crossOrigin="anonymous"
      />
      
      <QueryWrapper>
        <main className="bg-black mx-auto flex-1 overflow-hidden">
          {children}
        </main>
      </QueryWrapper>
    </>
  );
}
