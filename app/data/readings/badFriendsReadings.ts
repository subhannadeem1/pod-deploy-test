const bad_friends_251 : string[] = [
    "251-0a.jpg+The Dreamboat Tour+Stavros Halkias+https://www.stavvy.biz",
    "251-1a.jpg+Indiana Jones and the Last Crusade+Steven Spielberg+https://en.wikipedia.org/wiki/Indiana_Jones_and_the_Last_Crusade",
    "251-2a.jpg+Raiders of the Lost Ark+Steven Spielberg+https://en.wikipedia.org/wiki/Raiders_of_the_Lost_Ark",
    "251-3a.jpg+Indiana Jones and the Temple of Doom+Steven Spielberg+https://en.wikipedia.org/wiki/Indiana_Jones_and_the_Temple_of_Doom"
]

const bad_friends_250 : string[] = [
    "250-1a.jpg+Kingdom (tv show)+Kim Seong-hun & Park In-je+https://www.netflix.com/title/80180171",
    "250-2a.jpg+The Great British Baking Show (tv show)+ Byron Archard+https://www.netflix.com/title/80063224"
]

const bad_friends_249 : string[] = [
    "249-1a.jpg+Dazed and Confused (film)+Richard Linklater+https://en.wikipedia.org/wiki/Dazed_and_Confused_(film)"
]

const badFriendsReadings = new Map<string, string[]>()
badFriendsReadings.set("251", bad_friends_251)
badFriendsReadings.set("250", bad_friends_250)
badFriendsReadings.set("249", bad_friends_249)

export { badFriendsReadings }