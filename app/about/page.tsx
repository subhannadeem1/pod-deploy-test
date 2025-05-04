"use client"

import Head from "next/head"
import { Inter } from "next/font/google"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"]
})

export default function Page() {
  // Set this flag to true to disable animations.
  const disableAnimations = true

  const [svgLoaded, setSvgLoaded] = useState(false)
  const [showSparkles, setShowSparkles] = useState(true)
  const [showDogs, setShowDogs] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      }
      handleResize()
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setSvgLoaded(true)

    // Only run the timer if animations are enabled.
    if (!disableAnimations) {
      const timer = setTimeout(() => {
        setShowSparkles(false)
        setShowDogs(true)
      }, 6000)
      return () => clearTimeout(timer)
    } else {
      // If animations are disabled, force states to the “static” mode.
      setShowSparkles(false)
      setShowDogs(false)
    }
  }, [disableAnimations])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const sparkleVariants = {
    sparkle: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      rotate: [0, 20, -20, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  }

  const sparkles = [
    { top: "15%", left: "25%", size: "16px", color: "#FFD700" },
    { top: "35%", left: "75%", size: "12px", color: "#FFD700" },
    { top: "55%", left: "45%", size: "20px", color: "#FFD700" },
    { top: "75%", left: "75%", size: "14px", color: "#FFD700" },
    { top: "85%", left: "30%", size: "18px", color: "#FFD700" }
  ]

  const dogVariants = {
    initial: {
      opacity: 0,
      scale: 0,
      x: 0,
      y: 0
    },
    animate: (custom: any) => ({
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      x: [custom.xStart, custom.xEnd, custom.xStart],
      y: [custom.yStart, custom.yEnd, custom.yStart],
      rotate: [0, 360],
      transition: {
        duration: custom.duration,
        repeat: Infinity,
        ease: "linear"
      }
    })
  }

  const dogs =
    windowSize.width > 0 && windowSize.height > 0
      ? Array.from({ length: 20 }, (_, index) => ({
          id: index,
          xStart: Math.random() * windowSize.width - windowSize.width / 2,
          xEnd: Math.random() * windowSize.width - windowSize.width / 2,
          yStart: Math.random() * windowSize.height - windowSize.height / 2,
          yEnd: Math.random() * windowSize.height - windowSize.height / 2,
          duration: Math.random() * 5 + 5,
          delay: Math.random() * 4,
        }))
      : []

  return (
    <>
      <Head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </Head>
      
      <motion.div
        className={`md:mt-36 mt-20 mx-auto container scroll-smooth relative ${inter.className}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 1 }}
      >
        
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 md:px-6 py-10 md:py-16"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 1, delay: 0.3 }}
        >
          
          <motion.div
            className="flex flex-col items-center md:items-start text-left space-y-4"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className="text-[#d4d4d4] text-base md:text-lg xl:text-xl leading-relaxed">
              Hi,
              <br />
              I'm <span className="text-white font-semibold">Tomonari Feehan</span>
              <br /> Software Engineer
            </p>
            
            {/* <a
              href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#7a7a7a] text-white font-semibold rounded-md w-16 h-6 flex items-center justify-center text-xs opacity-90 hover:opacity-100 transition-transform transform hover:scale-105 focus:ring-2 focus:ring-white"
            >
              Support
            </a> */}
            
            <div className="flex gap-2 space-x-1">
              <a
                href="mailto:tomonari.feehan@protonmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#d4d4d4] hover:text-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-white"
              >
                <i className="bx text-2xl md:text-3xl bx-mail-send"></i>
              </a>
              
              <a
                href="https://www.linkedin.com/in/tomonari"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#d4d4d4] hover:text-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-white"
              >
                <i className="bx text-2xl md:text-3xl bxl-linkedin"></i>
              </a>
              
              <a
                href="https://github.com/tomonarifeehan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#d4d4d4] hover:text-white transition-transform transform hover:scale-105 focus:ring-2 focus:ring-white"
              >
                <i className="bx text-2xl md:text-3xl bxl-github"></i>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="flex-shrink-0"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 0.7 }}
          >
            <svg
              className="fill-[#d4d4d4] transition-transform transform hover:scale-105"
              viewBox="0 0 479 467"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
            >
              <mask id="mask0" mask-type="alpha">
                <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
              </mask>
              
              <g mask="url(#mask0)">
                <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
                
                <AnimatePresence>
                  {svgLoaded && (
                    <motion.image
                      // Always show the non-animated profile image when animations are disabled.
                      key={disableAnimations ? "profile" : showDogs ? "profile_sunglasses" : "profile"}
                      className="transition-transform transform hover:scale-105"
                      x="20"
                      y="80"
                      width="400"
                      height="400"
                      href={disableAnimations ? "/profile.png" : showDogs ? "/profile_sunglasses.png" : "/profile.png"}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </g>
            </svg>
          </motion.div>
        </motion.div>

        <section className="px-6 py-6">
          <motion.div
            className="flex flex-col items-center"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 1, delay: 1.2 }}
          >
            <motion.hr
              className="border-[#d4d4d4] w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.4 }}
            />
            <motion.p
              className="text-[#d4d4d4] mt-4 text-xs md:text-sm xl:text-base leading-relaxed text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              Due to time constraints, I spend maybe 5 minutes a week working on this site.
            </motion.p>
          </motion.div>
        </section>

        {/* Render sparkles only if animations are enabled */}
        {!disableAnimations && showSparkles && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            transition={{ delay: 2.6, duration: 1 }}
          >
            {sparkles.map((sparkle, index) => (
              <motion.svg
                key={index}
                className="absolute"
                style={{
                  top: sparkle.top,
                  left: sparkle.left,
                  width: sparkle.size,
                  height: sparkle.size,
                }}
                viewBox="0 0 24 24"
                fill={sparkle.color}
                variants={sparkleVariants}
                initial="hidden"
                animate="sparkle"
                transition={{
                  delay: 2.6 + index * 0.3,
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut",
                }}
              >
                <path d="M12 0L14.09 7.26L22 9.27L16.5 14.14L18.18 21.02L12 17.77L5.82 21.02L7.5 14.14L2 9.27L9.91 7.26L12 0Z" />
              </motion.svg>
            ))}
          </motion.div>
        )}

        {/* Render dogs only if animations are enabled */}
        {!disableAnimations && showDogs && windowSize.width > 0 && windowSize.height > 0 && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial="initial"
            animate="animate"
          >
            {dogs.map((dog) => (
              <motion.img
                key={dog.id}
                src="/corgi.jpg"
                alt="Corgi"
                className="absolute w-8 h-8"
                style={{
                  top: "50%",
                  left: "50%",
                  translateX: "-50%",
                  translateY: "-50%",
                }}
                variants={dogVariants}
                custom={{
                  xStart: dog.xStart,
                  xEnd: dog.xEnd,
                  yStart: dog.yStart,
                  yEnd: dog.yEnd,
                  duration: dog.duration,
                }}
                transition={{
                  delay: dog.delay,
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </>
  )
}
