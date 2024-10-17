<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Lunox&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> 
</p>

<p align="center"> 
  A simple yet powerful Discord music bot using the Lavalink client and Discord.js v14.
</p>

<p align="center"> 
  <a href="https://ko-fi.com/enourdev" target="_blank"> <img src="https://ko-fi.com/img/githubbutton_sm.svg"/> </a>
</p>

<p align="center"> 
  <a href="https://discord.gg/xhTVzbS5NU" target="_blank"> <img src="https://discordapp.com/api/guilds/1056011738950156359/widget.png?style=banner2"/> </a>
</p>

[![Version][version-shield]](version-url) [![MIT License][license-shield]][license-url] [![Contributors][contributors-shield]][contributors-url] [![Stargazers][stars-shield]][stars-url] [![Forks][forks-shield]][forks-url] [![Watchers][watchers-shield]][watchers-url] [![Issues][issues-shield]][issues-url]

### `📢` Main Features

-   ☑️ Used **[Rainlink](https://www.npmjs.com/package/rainlink)** Lavalink client
-   ☑️ Supports Lavalink v3 and v4
-   ☑️ Slash commands
-   ☑️ Prefix commands **[Dev-only commands]**
-   ☑️ Clean UI
-   ☑️ Better performance
-   ☑️ Easy to use
-   ☑️ And more...!

### `🎵` Supported Platforms

-   ☑️ Youtube
-   ☑️ Youtube Music
-   ☑️ Apple Music
-   ☑️ Deezer
-   ☑️ Spotify
-   ☑️ SoundCloud
-   ☑️ And more...!

### `📌` Requirements

-   Discord Bot Token **[[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)]**
-   Node.js **`v18`** or higher
-   MongoDB **`v5.x`** or higher **[For local database]**
-   Lavalink **[[Guide](https://lavalink.dev/)]**
-   Java **`v18`** or higher **[For Lavalink]**

### `🚀` Configuration & Installation

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
OWNER =  # Your Discord user ID
DEV =  # Your Discord ID & Your developer Discord user ID (separated by comma "," if more than one) [Example: 393798172591259651, 393798172591259651]
EMBED_COLOR = 5865F2 # Embed color, example: FFFFFF (without #)
LEAVE_TIMEOUT = 60000 # Set leave timeout when bot was alone or not playing
MIN_VOLUME = 1 # Minimum volume
MAX_VOLUME = 100 # Maximum volume
MONGO_URI =  # Your MongoDB URI
GENIUS_API_KEY =  # Your Genius API key
SUPPORT_SERVER_URL = https://discord.gg/kNdSkHchzH # Support server url

# RAINLINK DETAILS
DEFAULT_SEARCH_ENGINE = youtubeMusic # Default search engine. Available engines: youtubeMusic, youtube, soundcloud, spotify, deezer and apple
SPOTIFY_CLIENT_ID =  # Your Spotify client ID
SPOTIFY_CLIENT_SECRET =  # Your Spotify client secret
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
        driver: "lavalink/v4/koinu", // Available drivers based on your Lavalink version: https://github.com/RainyXeon/Rainlink#-drivers
    },
],
```

`5.` Go to `./src/settings/emoji.js`, open the file and fill out the emoji variables.

`6.` Start the bot by running.

```
npm start
```

### `🤖` Bots Using This Source Code

Below is a list of Discord bots that are using this source code. If you want your bots to be listed here, **`edit this table`** and make a pull request with the following format:

| No. | Bot Name           | Invite Link                                   | Support Server                                 |
|-----|--------------------|-----------------------------------------------|------------------------------------------------|
| 1   | Jive  | [Invite Link](https://discord.com/oauth2/authorize?client_id=1019954630551158934)   | [Jive Corner](https://discord.gg/kNdSkHchzH)  |
| 2   |   |    |   |
| 3   |   |    |   |
| 4   |   |    |   |

### `🔐` Licensed

Distributed under the [`MIT License`](https://github.com/adh319/Lunox/blob/main/LICENSE). You are free to use, and modify the code. However, you must provide attribution by linking back to the original repository and include this copyright notice:
```
© 2024 adh319@github. This project is available under the MIT License.You must include proper attribution by linking to the original GitHub repository: https://github.com/adh319/Lunox.
```

### `👥` Contributors

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
