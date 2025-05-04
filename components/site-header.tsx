"use client";

import Link from "next/link";
import {
  AlignJustify,
  BarChart2,
  Home,
  XIcon,
  MessageCircle,
  ArrowUpRight,
  Info,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { Search } from "./ui/search";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { useEffect, useState } from "react";
import { IconHome } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const menuItem = [
  { id: 2, label: "Trending", href: "/rankings" },
  { id: 3, label: "Chat", href: "/chat" },
  { id: 1, label: "About", href: "/about" },
];

const menuItems = [
  { href: "/", label: "Home", icon: IconHome },
  { href: "/chat", label: "Chat", icon: MessageCircle },
  { href: "/rankings", label: "Trending", icon: BarChart2 },
  { href: "/about", label: "About", icon: Info },
];

export function SiteHeader() {
  const mobilenavbarVariant = {
    initial: { opacity: 0, scale: 1 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, delay: 0.2, ease: "easeOut" },
    },
  };

  const mobileLinkVar = {
    initial: { y: "-20px", opacity: 0 },
    open: { y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const containerVariants = {
    open: { transition: { staggerChildren: 0.06 } },
  };
  const pathname = usePathname();
  const noBgPaths = ["/", "/chat"];
  const bgClass = noBgPaths.includes(pathname || "") ? "" : "bg-black/20";

  const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) html.classList.toggle("overflow-hidden", hamburgerMenuIsOpen);
  }, [hamburgerMenuIsOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setHamburgerMenuIsOpen(false);
    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);
    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, [setHamburgerMenuIsOpen]);

  return (
    <>
      {/* Desktop Header */}
      <header
        className={`fixed left-0 top-0 z-50 w-full backdrop-blur-md hidden lg:block ${bgClass}`}
        data-nosnippet
      >
        <div className="container flex h-[5rem] items-center justify-between">
          <div className="flex">
            <a href="/">
              <img
                src="/soundwave-icon2.svg"
                className="pt-e min-w-20 h-[60px]"
                alt="Logo"
              />
            </a>
            <Link
              className="text-md text-white -ml-1 font-semibold items-center  hidden lg:flex whitespace-nowrap"
              href="/"
              data-nosnippet
            >
              The Pod Transcripts
            </Link>
            <div className="items-center rounded-md border px-2.5 py-0.5 h-6 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground ml-2 my-auto hidden lg:flex">
              Beta
            </div>
          </div>
          <div className="pt-2 lg:flex items-center justify-between hidden">
            <ul className="flex gap-6 text-white font-semibold text-[18px]">
              <li>
                <Link className="transition group" href="/rankings">
                  <p data-nosnippet>Trending</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                </Link>
              </li>
              <li>
                <Link className="transition group" href="/chat">
                  <p data-nosnippet>Chat</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                </Link>
              </li>
              <li>
                <Link className="transition group" href="/about">
                  <p data-nosnippet>About</p>
                  <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-white" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Search />
          </div>
          {/*<div className="ml-auto h-full items-center hidden sm:flex">
            <Link className="mr-6 text-sm pl-4 hidden" href="/signin" data-nosnippet>
              Login
            </Link>
            <Link className={cn(buttonVariants({ variant: "secondary" }), "mr-6 text-sm hidden")} href="/signup" data-nosnippet>
              Sign up
            </Link>
          </div>*/}
        </div>
      </header>

      {/* Mobile Header */}
      <header
        className={`fixed left-0 top-0 z-50 w-full backdrop-blur-md block lg:hidden ${bgClass}`}
        data-nosnippet
      >
        <div className="container flex h-[76px] items-center justify-between">
          <div className="flex items-center">
            <a href="/">
              <img
                src="/soundwave-icon2.svg"
                className="h-14 w-14 object-contain text-white"
                alt="Logo"
              />
            </a>
            <Link
              className="text-base text-white font-semibold -ml-[2px] whitespace-nowrap"
              href="/"
              data-nosnippet
            >
              The Pod Transcripts
            </Link>
          </div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="block lg:hidden">
              <AlignJustify size={24} className="text-white" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] block lg:hidden bg-transparent rounded-l-[40px]  border-none shadow-md text-white p-0 backdrop-blur-md"
            >
              <SheetClose className="absolute right-4 top-4" />
              <div className="flex flex-col h-full">
                <div className="mt-14 px-4">
                  <Search />
                </div>
                <nav className="flex-grow">
                  <ul className="space-y-2 px-4 mt-6">
                    {menuItems.map(({ href, label, icon: Icon }) => (
                      <li key={href}>
                        <Link
                          href={href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between px-1 border-b border-gray-400 py-3  transition-colors duration-200"
                        >
                          <div className="flex gap-2">
                            <Icon className="w-6 h-6 text-white" />
                            <span className="text-lg font-medium text-white">
                              {label}
                            </span>
                          </div>
                          <ArrowUpRight />
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

      {/* Mobile Hamburger Nav Overlay */}
      <AnimatePresence>
        <motion.nav
          initial="initial"
          exit="exit"
          variants={mobilenavbarVariant}
          animate={hamburgerMenuIsOpen ? "animate" : "exit"}
          className={cn(
            "fixed left-0 top-0 z-50 h-screen w-full overflow-auto bg-black/40 backdrop-blur-md",
            {
              "pointer-events-none": !hamburgerMenuIsOpen,
            }
          )}
        >
          <div className="container flex h-[3.5rem] items-center justify-between">
            <Link className="text-md flex items-center text-white" href="/">
              The Pod Transcripts
            </Link>
            <button
              className="ml-6 lg:hidden"
              onClick={() => setHamburgerMenuIsOpen((open) => !open)}
            >
              <span className="sr-only">Toggle menu</span>
              {hamburgerMenuIsOpen ? (
                <XIcon className="text-white" />
              ) : (
                <AlignJustify className="text-white" />
              )}
            </button>
          </div>
          <motion.ul
            className="flex flex-col lg:flex-row lg:items-center pl-2"
            variants={containerVariants}
            initial="initial"
            animate={hamburgerMenuIsOpen ? "open" : "exit"}
          >
            {menuItem.map((item) => (
              <motion.li
                variants={mobileLinkVar}
                key={item.id}
                className="border-grey-dark pl-6 py-0.5 border-b md:border-none"
              >
                <Link
                  className="hover:text-grey flex h-[var(--navigation-height)] w-full items-center text-xl transition-[color,transform] duration-300"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.nav>
      </AnimatePresence>
    </>
  );
}
