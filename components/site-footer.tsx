import Link from "next/link"
import { BsReddit } from "react-icons/bs"
import { SiBuymeacoffee } from "react-icons/si"
import { TwitterLogoIcon } from "@radix-ui/react-icons"

const footerNavs = [
  {
    label: "API",
    items: [
      { href: "/api", name: "Documentation" },
      { href: "/api", name: "Pricing" },
      { href: "/api", name: "FAQ" },
    ],
  },
  {
    label: "Community",
    items: [
      { href: "https://twitter.com/podtranscripts", name: "Twitter", target: "_blank" },
      { href: "https://www.reddit.com/user/thepodtranscripts/submitted", name: "Reddit", target: "_blank" },
      { href: "mailto:tomonari.feehan@protonmail.com", name: "Email" },
    ],
  },
  {
    label: "Legal",
    items: [
      { href: "/terms", name: "Terms & Conditions" },
      { href: "/privacy", name: "Privacy Policy" },
      { href: "/affiliate", name: "Affiliate Disclosure" },
    ],
  },
]

const footerSocials = [
  { href: "https://twitter.com/podtranscripts", name: "Twitter", icon: <TwitterLogoIcon className="h-4 w-4" /> },
  { href: "https://www.reddit.com/user/thepodtranscripts/submitted", name: "Reddit", icon: <BsReddit className="h-4 w-4" /> },
  { href: "https://www.buymeacoffee.com/thepodtranscripts", name: "Buy Me a Coffee", icon: <SiBuymeacoffee className="h-4 w-4" /> },
]

export function SiteFooter() {
  return (
    <footer className="bg-[#efe9df]" data-nosnippet>
      <div className="mx-auto w-full max-w-screen-xl xl:pb-2">
        <div className="md:flex md:justify-between px-8 p-4 py-8 md:py-16 sm:pb-16 gap-4">
          <div className="mb-12 flex-col gap-4 hidden lg:flex">
            <Link href="/" className="flex items-center gap-2">
              <img src="/soundwave-icon.png" className="h-20 w-20 text-primary" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap" data-nosnippet>The Pod Transcripts</span>
            </Link>
            <p className="max-w-xs pl-4" data-nosnippet>Unlock the power of podcasts.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-3" data-nosnippet>
            {footerNavs.map((nav) => (
              <div key={nav.label}>
                <h2 className="mb-6 text-sm tracking-tighter font-medium text-gray-900 uppercase">{nav.label}</h2>
                <ul className="gap-2 grid">
                  {nav.items.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} target={item.target ? item.target : ""} className="cursor-pointer text-gray-500 hover:text-gray-700 duration-200 font-[450] text-sm">{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:flex sm:items-center sm:justify-between border-t xl:border rounded-md border-dashed border-neutral-700/20 py-4 px-8 gap-2">
          <div className="flex space-x-5 sm:justify-center sm:mt-0" data-nosnippet>
            {footerSocials.map((social) => (
              <Link key={social.name} href={social.href} className="text-gray-500 hover:text-gray-900 fill-gray-500 hover:fill-gray-900" target="_blank">
                {social.icon}
                <span className="sr-only">{social.name}</span>
              </Link>
            ))}
          </div>
          <span className="text-sm text-gray-500 sm:text-center">
            Copyright © {new Date().getFullYear()} <Link href="/" className="cursor-pointer">The Pod Transcripts</Link>.
            <br className="sm:hidden" /> All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}