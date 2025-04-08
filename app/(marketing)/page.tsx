import AnimatedBeamSection from "@/components/landing-page/animated-beam-section";
import ExploreSection from "@/components/landing-page/explore-section";
import HeroSection from "@/components/landing-page/hero-section";

export default async function Page() {
  return (
    <>
      <HeroSection />
      <AnimatedBeamSection />
      <ExploreSection />
    </>
  );
}
