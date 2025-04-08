"use client";

import DotPattern from "../magicui/dot-pattern";
import React from "react";
import Ripple from "../magicui/ripple";

import { AnimatedBeam } from "../magicui/animated-beam";
import { cn } from "@/lib/utils";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { forwardRef, useRef } from "react";
import {
  SiApple,
  SiGoogledrive,
  SiOpenai,
  SiSpotify,
  SiYoutube,
} from "react-icons/si";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-border bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className
      )}
    >
      {children}
    </div>
  );
});

export default function AnimatedBeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div>
      <div
        className="hidden sm:flex p-32 pt-10 bg-black relative flex-col h-full w-screen items-center justify-center d:shadow-xl"
        ref={containerRef}
      >
        <div className="mx-auto max-w-[700px] text-center pb-10 opacity-90">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Podcasts, simplified.
          </h2>

          <p className="mt-6 text-lg sm:text-xl font-light text-white opacity-80 leading-relaxed">
            All-in-one platform for podcast transcripts, summaries, and insights.
            Transforming podcasts into an interactive knowledge base.
          </p>
        </div>

        <div className="pb-24 flex h-full w-full max-w-[700px] flex-row items-stretch justify-between gap-10 p-6">
          <div className="flex flex-col justify-center gap-2">
            <Circle ref={div1Ref} className="opacity-50">
              <SiOpenai className="h-6 w-6 text-black" />
            </Circle>
            <Circle ref={div2Ref} className="opacity-50">
              <SiGoogledrive className="h-6 w-6 text-black" />
            </Circle>
            <Circle ref={div3Ref} className="opacity-50">
              <SiYoutube className="h-6 w-6 text-black" />
            </Circle>
            <Circle ref={div4Ref} className="opacity-50">
              <SiSpotify className="h-6 w-6 text-black" />
            </Circle>
            <Circle ref={div5Ref} className="opacity-50">
              <SiApple className="h-6 w-6 text-black" />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div6Ref} className="h-16 w-16 opacity-60">
              <img src="/soundwave.svg" className="h-12 w-12 text-black" />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div7Ref} className="opacity-50">
              <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-black" />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
        />
        <DotPattern
          className={cn(
            "[mask-image:radial-gradient(2000px_circle_at_center,white,transparent)]",
            "z-0"
          )}
        />

        <Ripple />
      </div>
    </div>
  );
}