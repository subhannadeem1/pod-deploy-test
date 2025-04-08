"use client"

import * as React from "react"
import Link from "next/link"

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useRouter } from "next/navigation"

type Option = {
  value: string
  label: string
  image_filename: string
}

const podcast_options: Option[] = [
  { value: "all-in", label: "All-In Podcast", image_filename: "/all-in.jpg" },
  // { value: "bad-friends", label: "Bad Friends", image_filename: "/bad-friends.jpg" },
  { value: "dwarkesh", label: "Dwarkesh Podcast", image_filename: "/dwarkesh.jpg" },
  { value: "huberman", label: "Huberman Lab", image_filename: "/huberman.jpg" },
  // { value: "iced-coffee", label: "Iced Coffee Hour", image_filename: "/iced-coffee.jpg" },
  // { value: "impaulsive", label: "Impaulsive", image_filename: "/impaulsive.jpg" },
  { value: "jre", label: "Joe Rogan Experience", image_filename: "/jre.jpg" },
  { value: "lex-fridman", label: "Lex Fridman Podcast", image_filename: "/lex-fridman.jpg" },
  { value: "no-jumper", label: "No Jumper", image_filename: "/no-jumper.jpg" },
  // { value: "tigerbelly", label: "Tigerbelly", image_filename: "/tigerbelly.jpg" },
]

const people_options: Option[] = [
  { value: "jre", label: "Joe Rogan", image_filename: "/jre-search.jpg" },
  { value: "huberman", label: "Andrew Huberman", image_filename: "/huberman-search.jpg" },
  { value: "lex-fridman", label: "Lex Fridman", image_filename: "/lex-fridman-search.jpg" },
  { value: "dwarkesh", label: "Dwarkesh Patel", image_filename: "/dwarkesh-search.jpg" },
]

export function Search() {
  
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  const handleInputChange = (inputValue: any) => {
    console.log("Input changed")
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <button
        className="lg:ml-48 mt-1 inline-flex items-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input hover:opacity-90 hover:text-black px-2 py-2 relative h-12 lg:h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none sm:pr-12  lg:w-64 opacity-70"
        onClick={(e) => {
          e.preventDefault()
          setOpen((open) => !open)
        }}
      >
        <p className="text-sm text-muted-foreground">
          Search podcasts...{" "}
          <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 lg:flex">
            <span className="text-xs">⌘</span>J
          </kbd>
        </p>
      </button>

      <CommandDialog open={ open } onOpenChange={ setOpen }>
        
        <CommandInput placeholder="Search podcasts..." onInput={ handleInputChange } />

        <CommandList>
          
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Podcasts">
            { podcast_options?.map((podcast, idx) => (
              <CommandItem
                key={idx}
                onClick={(e) => {
                  router.push(`/podcast/${podcast.value}`)
                }}
              >
                <img className="mr-2 h-6 w-6 rounded-xl" src={ podcast.image_filename } />
                <Link href={`/podcast/${podcast.value}`}>{ podcast.label }</Link>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="People">
            { people_options?.map((person, idx) => (
              <CommandItem key={idx}>
                <img className="mr-2 h-6 w-6 rounded-xl" src={ person.image_filename } />
                <Link href={`/podcast/${person.value}`}>{ person.label }</Link>
              </CommandItem>
            ))}
          </CommandGroup>

        </CommandList>

      </CommandDialog>
    </>
  )
}