"use client"

import Link from "next/link"

import { AlignJustify, BarChart2, Home, XIcon, MessageCircle } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Search } from "./ui/search"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { useEffect, useState } from "react"

const menuItem = [
  { id: 2, label: "Trending", href: "/rankings" },
  { id: 3, label: "Chat", href: "/chat" },
  { id: 1, label: "About", href: "/about" },
]

const menuItems = [
  { href: "/rankings", label: "Trending", icon: BarChart2 },
   { href: "/chat", label: "Chat", icon: MessageCircle },
  //{ href: "#", label: "API", icon: DatabaseZap },
  { href: "/about", label: "About", icon: Home },
]

export function SiteHeader() {
  const mobilenavbarVariant = {
    initial: { opacity: 0, scale: 1 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.2, ease: "easeOut" } },
    exit: { opacity: 0, transition: { duration: 0.2, delay: 0.2, ease: "easeOut" } },
  }

  const mobileLinkVar = {
    initial: { y: "-20px", opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  }

  const containerVariants = {
    open: { transition: { staggerChildren: 0.06 } },
  }

  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const html = document.querySelector("html")
    if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen)
  }, [hamburgerMenuIsOpen])

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false)
    window.addEventListener("orientationchange", closeHamburgerNavigation)
    window.addEventListener("resize", closeHamburgerNavigation)
    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation)
      window.removeEventListener("resize", closeHamburgerNavigation)
    }
  }, [setHamburgerMenuIsOpen])

  return (
    <>
      <header className="bg-[#efe9df] fixed left-0 top-0 z-50 w-full border-b backdrop-blur-[12px] hidden lg:block" data-nosnippet>
        <div className="container flex h-[5rem] items-center justify-between">
          <a href="/"><img src="/soundwave-icon.png" className="pt-2 min-w-24 h-20" /></a>
          <Link className="text-md text-slate-950 font-semibold items-center ml-2 hidden lg:flex whitespace-nowrap" href="/" data-nosnippet>The Pod Transcripts</Link>
          <div className="items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground ml-1 mt-1 hidden lg:flex">Beta</div>
          <div className="pl-20 pt-2 lg:flex items-center justify-between hidden">
            <ul className="flex gap-6 text-slate-950 font-semibold text-md">
              <li>
                <Link className="transition group" href="/rankings">
                  <p data-nosnippet>Trending</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-slate-950" />
                </Link>
              </li>
              <li>
                <Link className="transition group" href="/chat">
                  <p data-nosnippet>Chat</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-slate-950" />
                </Link>
              </li>
              {/*<li>
                <Link className="transition group" href="#">
                  <p data-nosnippet>API</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-slate-950" />
                </Link>
              </li>*/}
              <li>
                <Link className="transition group" href="/about">
                  <p data-nosnippet>About</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-slate-950" />
                </Link>
              </li>
            </ul>
          </div>
          <div><Search /></div>
          <div className="ml-auto h-full items-center hidden sm:flex">
            <Link className="mr-6 text-sm pl-4 hidden" href="/signin" data-nosnippet>Login</Link>
            <Link className={cn(buttonVariants({ variant: "secondary" }), "mr-6 text-sm hidden")} href="/signup" data-nosnippet>Sign up</Link>
          </div>
        </div>
      </header>

      <header className="bg-[#efe9df] fixed left-0 top-0 z-50 w-full border-b backdrop-blur-[12px] block lg:hidden" data-nosnippet>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <a href="/"><img src="/soundwave-icon.png" className="h-12 w-12 object-contain" alt="Logo" /></a>
            <Link className="text-sm text-slate-950 font-semibold ml-2 whitespace-nowrap" href="/" data-nosnippet>The Pod Transcripts</Link>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="block lg:hidden"><AlignJustify size={24} /></SheetTrigger>
            <SheetContent side="right" className="w-[300px] block lg:hidden bg-[#efe9df] shadow-md text-black p-0">
              <SheetClose className="absolute right-4 top-4"></SheetClose>
              <div className="flex flex-col h-full">
                <div className="mt-10 px-4"><Search /></div>
                <nav className="flex-grow">
                  <ul className="space-y-2 px-4 mt-4">
                    {menuItems.map(({ href, label, icon: Icon }) => (
                      <li key={href}>
                        <Link href={href} onClick={() => setOpen(false)} className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-[#e2d8c8] transition-colors duration-200">
                          <Icon className="w-6 h-6 text-black" />
                          <span className="text-lg font-medium text-black">{label}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 ml-auto">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <AnimatePresence>
        <motion.nav initial="initial" exit="exit" variants={mobilenavbarVariant} animate={hamburgerMenuIsOpen ? "animate" : "exit"} className={cn(`fixed left-0 top-0 z-50 h-screen w-full overflow-auto bg-background/70 backdrop-blur-[12px] `, { "pointer-events-none": !hamburgerMenuIsOpen })}>
          <div className="container flex h-[3.5rem] items-center justify-between">
            <Link className="text-md flex items-center" href="/">The Pod Transcripts</Link>
            <button className="ml-6 lg:hidden" onClick={() => setHamburgerMenuIsOpen((open) => !open)}>
              <span className="sr-only">Toggle menu</span>
              {hamburgerMenuIsOpen ? <XIcon /> : <AlignJustify />}
            </button>
          </div>
          <motion.ul className="flex flex-col lg:flex-row lg:items-center ease-in pl-2" variants={containerVariants} initial="initial" animate={hamburgerMenuIsOpen ? "open" : "exit"}>
            {menuItem.map((item) => (
              <motion.li variants={mobileLinkVar} key={item.id} className="border-grey-dark pl-6 py-0.5 border-b md:border-none">
                <Link className={`hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300 md:translate-y-0 md:text-sm md:transition-colors ${hamburgerMenuIsOpen ? "[&_a]:translate-y-0" : ""}`} href={item.href}>
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      </AnimatePresence>
    </>
  )
}