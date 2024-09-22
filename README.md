<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Lunox&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> 
</p>

<p align="center"> 
  <a href="https://ko-fi.com/enourdev" target="_blank"> <img src="https://ko-fi.com/img/githubbutton_sm.svg"/> </a>
</p>

<p align="center"> 
  <a href="https://discord.gg/xhTVzbS5NU" target="_blank"> <img src="https://discordapp.com/api/guilds/1056011738950156359/widget.png?style=banner2"/> </a>
</p>

[![Version][version-shield]](version-url) [![MIT License][license-shield]][license-url] [![Contributors][contributors-shield]][contributors-url] [![Stargazers][stars-shield]][stars-url] [![Forks][forks-shield]][forks-url] [![Watchers][watchers-shield]][watchers-url] [![Issues][issues-shield]][issues-url]

## 📢 Main Features

-   ☑️ Used **[Rainlink](https://www.npmjs.com/package/rainlink)** Lavalink client
-   ☑️ Support Lavalink v3 and v4
-   ☑️ Slash sommands
-   ☑️ Prefix commands **[Dev-onlycommands]**
-   ☑️ Clean UI
-   ☑️ Better performance
-   ☑️ Easy to use
-   ☑️ And more...!

## 🎵 Supported Platforms

-   ☑️ Youtube
-   ☑️ Youtube Music
-   ☑️ Apple Music
-   ☑️ Deezer
-   ☑️ Spotify
-   ☑️ SoundCloud
-   ☑️ And more...!

## 📌 Requirements

-   Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
-   Node.js **`v18`** or higher
-   MongoDB **`v5.x`** or higher **[For local database]**
-   Lavalink **[Guide](https://lavalink.dev/)**
-   Java **`v18`** or higher **[For Lavalink]**

## 🚀 Configuration & Installation

`1.` Clone the repository.

```
git clone https://github.com/adh319/Lunox.git
```

`2.` Open the Lunox folder then run

```
npm install
```

`3.` Rename `.env.example` to `.env` and fill out these variables according to yours.

```
#########################################
# ALL THE DETAILS BELOW SHOULD BE FILLED #
#########################################

# GENERAL DETAILS
TOKEN =  # Your bot token
PREFIX = ! # Prefix of the bot
OWNER =  # Your Discord user Id
DEV =  # Your Discord Id & Your developer Discord user Id (separated by comma "," if more than one) [Example: 393798172591259651, 393798172591259651]
EMBED_COLOR = 5865F2 # Embed color, example: FFFFFF (without #)
LEAVE_TIMEOUT = 60000 # Set leave TimeOut when bot was alone or not playing
MIN_VOLUME = 1 # Minimum volume
MAX_VOLUME = 100 # Maximum volume
MONGO_URI =  # Your MongoDB URI
GENIUS_API_KEY =  # Your genius api key
SUPPORT_SERVER_URL = https://discord.gg/kNdSkHchzH # Support server url

# RAINLINK DETAILS
DEFAULT_SEARCH_ENGINE = spotify # Default search engine. Available engines: youtubeMusic, youtube, soundcloud, spotify, deezer and apple
SPOTIFY_CLIENT_ID =  # Your spotify client id
SPOTIFY_CLIENT_SECRET =  # Your spotify client secret
```

`4.` Go to `./src/settings/config.js`, open the file and fill out these config options value.

```js
rainlinkNodes: [
    {
        name: "Lunox",
        host: "localhost",
        port: 2333,
        auth: "youshallnotpass",
        secure: false,
        driver: "lavalink/v4/koinu", // Available drivers based on your Lavalink version: https://github.com/RainyXeon/Rainlink/?tab=readme-ov-file#-drivers
    },
],
```

`5.` Go to `./src/settings/emoji.js`, open the file and fill out the emoji variables. `4.` Start the bot by running.

```
npm start
```

## 🙏🏻 Special Thanks

-   [Parasop](https://github.com/parasop)
-   [Adivise](https://github.com/Adivise)
-   [RainyXeon](https://github.com/RainyXeon)
-   [Appu](https://github.com/appujet)

## 🔐 Licensed

Distributed under the `MIT License`. See [`LICENSE`](https://github.com/adh319/Lunox/blob/main/LICENSE) for more information.

## 👥 Contributors

<a href="https://github.com/adh319/Lunox/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=adh319/Lunox" />
</a>

[version-shield]: https://img.shields.io/github/package-json/v/adh319/Lunox?style=for-the-badge
[contributors-shield]: https://img.shields.io/github/contributors/adh319/Lunox.svg?style=for-the-badge
[contributors-url]: https://github.com/adh319/Lunox/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/adh319/Lunox.svg?style=for-the-badge
[forks-url]: https://github.com/adh319/Lunox/network/members
[watchers-shield]: https://img.shields.io/github/watchers/adh319/Lunox?style=for-the-badge
[watchers-url]: https://github.com/adh319/Lunox
[stars-shield]: https://img.shields.io/github/stars/adh319/Lunox.svg?style=for-the-badge
[stars-url]: https://github.com/adh319/Lunox/stargazers
[issues-shield]: https://img.shields.io/github/issues/adh319/Lunox.svg?style=for-the-badge
[issues-url]: https://github.com/adh319/Lunox/issues
[license-shield]: https://img.shields.io/github/license/adh319/Lunox.svg?style=for-the-badge
[license-url]: https://github.com/adh319/Lunox/blob/main/LICENSE
[spon-img]: https://media.discordapp.net/attachments/979364157541462066/982734017671606322/Vultr_Logo_Download_Vector.png
