import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <SiteHeader />

      <main
        className="
          mx-auto flex-1 overflow-hidden
          bg-black
        "
      >
        {children}
      </main>

      <SiteFooter />
    </>
  );
}
