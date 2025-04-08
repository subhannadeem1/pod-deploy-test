import { allInPodcastTitles, chdPodcastTitles, conanPodcastTitles, hubermanPodcastTitles, icedCoffeePodcastTitles, impactTheoryPodcastTitles, impaulsivePodcastTitles, jrePodcastTitles, lexFridmanPodcastTitles, noJumperPodcastTitles, tigerbellyPodcastTitles, dwarkeshPodcastTitles, badFriendsTitles, pardonMyTakeTitles, bigHonkerTitles, upFirstTitles, crimeJunkieTitles, theRingerTitles, wasThatTmiTitles, shawnRyanTitles, telepathyTapesTitles } from "@/app/data/general/episode-titles"

const fetchTitle = (slug: string) => {

    if (slug == "jre") return jrePodcastTitles
    if (slug == "lex-fridman") return lexFridmanPodcastTitles
    if (slug == "huberman") return hubermanPodcastTitles
    if (slug == "chd") return chdPodcastTitles
    if (slug == "iced-coffee") return icedCoffeePodcastTitles
    if (slug == "all-in") return allInPodcastTitles
    if (slug == "tigerbelly") return tigerbellyPodcastTitles
    if (slug == "bad-friends") return badFriendsTitles
    if (slug == "impaulsive") return impaulsivePodcastTitles
    if (slug == "conan") return conanPodcastTitles
    if (slug == "no-jumper") return noJumperPodcastTitles
    if (slug == "impact-theory") return impactTheoryPodcastTitles
    if (slug == "dwarkesh") return dwarkeshPodcastTitles
    if (slug == "bad-friends") return badFriendsTitles
    if (slug == "pardon-my-take") return pardonMyTakeTitles
    if (slug == "big-honker") return bigHonkerTitles
    if (slug == "up-first") return upFirstTitles
    if (slug == "crime-junkie") return crimeJunkieTitles
    if (slug == "the-ringer") return theRingerTitles
    if (slug == "was-that-tmi") return wasThatTmiTitles
    if (slug == "shawn-ryan") return shawnRyanTitles
    if (slug == "telepathy-tapes") return telepathyTapesTitles
}

const fetchBrowserTitle = (slug: string, episode: string, browserTitle: boolean) => {

    if (slug == "huberman") {
        return browserTitle ? "Huberman Lab #" + episode + " - " + fetchTitle(slug)?.get(episode) : "Huberman Lab #" + episode
    }

    if (slug == "jre") {
        return "JRE #" + episode + " - " + fetchTitle(slug)?.get(episode)
    }

    if (slug == "lex-fridman") {
        return browserTitle ? "Lex Fridman #" + episode + " - " + fetchTitle(slug)?.get(episode) : "Lex Fridman #" + episode + " - " + fetchTitle(slug)?.get(episode)?.split(":")[0]
    }

    if (slug == "no-jumper") {
        return "No Jumper #" + episode + " - " + fetchTitle(slug)?.get(episode)
    }

    if (slug == "dwarkesh") {
        return "Dwarkesh #" + episode + " - " + fetchTitle(slug)?.get(episode)?.split("-")[0]
    }

    if (slug == "chd") return "Call Her Daddy #" + episode
    if (slug == "iced-coffee") return "Iced Coffee Hour #" + episode
    if (slug == "all-in") return "All-In Podcast #" + episode
    if (slug == "tigerbelly") return "Tigerbelly #" + episode
    if (slug == "bad-friends") return "Bad Friends #" + episode
    if (slug == "impaulsive") return "Impaulsive #" + episode
    if (slug == "conan") return "Conan O'Brien Needs a Friend #" + episode
    if (slug == "impact-theory") return "Impact Theory #" + episode
    if (slug == "theo-von") return "This Past Weekend #" + episode
    if (slug == "last-podcast") return "Last Podcast on the Left #" + episode
    if (slug == "matt-and-shane") return "Matt and Shane's Secret Podcast #" + episode
    if (slug == "arm-chair") return "Armchair Expert #" + episode
    if (slug == "new-heights") return "New Heights #" + episode
    if (slug == "the-daily") return "The Daily #" + episode
    if (slug == "pardon-my-take") return "Pardon My Take #" + episode
    if (slug == "big-honker") return "The Big Honker Podcast #" + episode
    if (slug == "up-first") return "Up First #" + episode
    if (slug == "crime-junkie") return "Crime Junkie #" + episode
    if (slug == "the-ringer") return "The Ringer #" + episode
    if (slug == "was-that-tmi") return "was that TMI? #" + episode
    if (slug == "shawn-ryan") return "The Shawn Ryan Show #" + episode
    if (slug == "telepathy-tapes") return "The Telepathy Tapes #" + episode
}

export { fetchBrowserTitle, fetchTitle }