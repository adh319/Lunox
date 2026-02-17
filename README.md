<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=LUNOX&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> 
</p>

<p align="center"> 
  Shard-ready Discord music bot powered by Rainlink, Lavalink, and Discord.js v14.
</p>

<p align="center"> 
  <a href="https://discord.gg/xhTVzbS5NU" target="_blank"> <img src="https://discordapp.com/api/guilds/1056011738950156359/widget.png?style=banner2"/> </a>
</p>

<p align="center">

[![Version][version-shield]](version-url) [![MIT License][license-shield]][license-url] [![Contributors][contributors-shield]][contributors-url] [![Stargazers][stars-shield]][stars-url] [![Forks][forks-shield]][forks-url] [![Watchers][watchers-shield]][watchers-url] [![Issues][issues-shield]][issues-url] [![Node Version][node-shield]](#-requirements) [![Discord.js][discordjs-shield]](https://discord.js.org/#/docs/discord.js/main/general/welcome) [![Rainlink][rainlink-shield]](https://www.npmjs.com/package/rainlink)

</p>

### `🧭` Table of Contents

- [Main Features](#-main-features)
- [Command Overview](#-command-overview)
- [Supported Platforms](#-supported-platforms)
- [Requirements](#-requirements)
- [Configuration & Installation](#-configuration--installation)
- [Support the Project](#-support-the-project)
- [Bots Using This Source Code](#-bots-using-this-source-code)
- [License](#-license)
- [Contributors](#-contributors)

---

### `📢` Main Features

- ☑️ Rainlink-powered Lavalink client with v3/v4 drivers and voice-specific plugin out of the box
- ☑️ Full Discord.js v14 slash command set plus dev-only prefix commands for ops/maintenance
- ☑️ Interactive Now Playing controller (pause/resume, volume up/down, loop, shuffle, previous, skip, stop)
- ☑️ Rich music controls: play/playlist, queue paging, loop (song/queue/off), seek, skip, previous, remove, clear, shuffle, volume bounds
- ☑️ Audio extras: 8D/bass/nightcore/vaporwave and more filters; autoplay (YouTube) and 24/7 stay-in-voice toggle
- ☑️ Resilient UX: inactivity auto-leave with configurable timeout, reconnect/keep-alive mode, anti-crash listeners, maintenance lock, per-user bans
- ☑️ Mongo-backed guild/user state (reconnect targets, bans) with periodic sync to the database
- ☑️ Ready-to-configure embeds/emojis, Genius lyrics lookup, and minimal onboarding defaults

### `🎛️` Command Overview

- General: `/help`, `/ping`
- Music: `/play`, `/queue`, `/skip`, `/previous`, `/pause`, `/resume`, `/stop`, `/seek`, `/remove`, `/clear`, `/shuffle`, `/loop`, `/filter`, `/volume`, `/join`, `/leave`, `/lyric`
- Settings: `/247` (stay in VC), `/autoplay`
- Dev (prefix, gated): `ban`, `unban`, `maintenance`, `lavalink`

---

### `🎵` Supported Platforms

- ☑️ SoundCloud
- ☑️ YouTube & YouTube Music ([Youtube Plugin Required](https://github.com/lavalink-devs/youtube-source))
- ☑️ Apple Music ([LavaSrc Plugin Required](https://github.com/topi314/LavaSrc))
- ☑️ Deezer ([LavaSrc Plugin Required](https://github.com/topi314/LavaSrc))
- ☑️ Spotify ([LavaSrc Plugin Required](https://github.com/topi314/LavaSrc))
- ☑️ And more!

---

### `📌` Requirements

- Discord Bot Token ([Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot))
- Node.js **`v18`** or higher
- MongoDB **`v5.x`** or higher (for local databases)
- Lavalink ([Guide](https://lavalink.dev/))
- Java **`v17`** or higher (for Lavalink)

---

### `🚀` Configuration & Installation

**1.** Clone the repository:

```bash
git clone https://github.com/adh319/Lunox.git
```

`2.` Open the Lunox folder and install dependencies:

```
npm install
```

`3.` Rename `.env.example` to `.env` and configure the environment variables:

```
#########################################
#         FILL IN ALL DETAILS BELOW     #
#########################################

# GENERAL CONFIGURATION
TOKEN = # Your bot token
PREFIX = ! # Bot prefix
EMBED_COLOR = 5865F2 # Embed color (hex format, without #)
LEAVE_TIMEOUT = 60000 # Time (in ms) before the bot leaves when alone/not playing
DEFAULT_VOLUME = 100 # Default volume when bot joins a voice channel
MIN_VOLUME = 1 # Minimum volume level
MAX_VOLUME = 100 # Maximum volume level
MONGO_URI = # Your MongoDB connection URI
GENIUS_API_KEY = # Your Genius API key
SUPPORT_SERVER_URL = "https://discord.gg/kNdSkHchzH" # Your Discord support server URL

# RAINLINK CONFIGURATION
LAVALINK_SOURCE = yt # Based on enabled sources in Lavalink config, see ./src/settings/config.js for more details
DEFAULT_SEARCH_ENGINE = youtubeMusic # Available options: youtubeMusic, youtube, soundcloud
SPOTIFY_CLIENT_ID = # Your Spotify Client ID
SPOTIFY_CLIENT_SECRET = # Your Spotify Client Secret
```

`4.` Edit your Lavalink node settings & dev ID(s) in ./src/settings/config.js:

```js
// line 8
dev: [""], // Your Discord user ID(s), e.g. ["123456789012345678"]

// line 32
rainlinkNodes: [
    {
        name: "Lunox",
        host: "localhost",
        port: 2333,
        auth: "youshallnotpass",
        secure: false,
        driver: "lavalink/v4/koinu", // Driver depends on your Lavalink version
    },
],
```

`5.` Open `./src/settings/emoji.js` and configure custom emojis.

`6.` Start the bot:

```
npm start
```

### 💖 Support the Project

If you find Lunox useful, consider supporting continued development:

<p align="center">
  <a href="https://github.com/sponsors/adh319">
    <img src="https://img.shields.io/badge/GitHub_Sponsors-Support-ea4aaa?style=for-the-badge&logo=github-sponsors" alt="GitHub Sponsors"/>
  </a>
  <a href="https://paypal.me/LunoxBot">
    <img src="https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal" alt="PayPal"/>
  </a>
  <a href="https://ko-fi.com/lunoxbot">
    <img src="https://img.shields.io/badge/Ko--fi-Support-FF5E5B?style=for-the-badge&logo=ko-fi" alt="Ko-fi"/>
  </a>
</p>

- **GitHub Sponsors** — [https://github.com/sponsors/adh319](https://github.com/sponsors/adh319)
- **PayPal** — [https://paypal.me/LunoxBot](https://paypal.me/LunoxBot)
- **Ko-fi** — [https://ko-fi.com/lunoxbot](https://ko-fi.com/lunoxbot)

### `🤖` Bots Using This Source Code

If you're using this source code and want your bot listed below, submit a pull request by editing the table with your details:

| No. | Bot Name | Invite Link | Support Server |
| --- | --- | --- | --- |
| `1` | Jive | [Invite Link](https://discord.com/oauth2/authorize?client_id=1019954630551158934) | [Jive Corner](https://discord.gg/kNdSkHchzH) |
| `2` | Xyvo | [Invite Link](https://discord.com/api/oauth2/authorize?client_id=1448697407973097522&permissions=8&scope=bot%20applications.commands) | [Xyvo](https://discord.gg/vGjcnBjVyY) |
| `3` |  |  |  |
| `4` |  |  |  |

### `🚀` Jive Bot Source Code

**Jive bot source code is now available for purchase!** If you're interested in obtaining the source code for Jive, which is more powerful with better features and code structure, please visit the [Enour Dev](https://discord.gg/xhTVzbS5NU) Discord server for more details.

### `🔐` License

This project is licensed under the [`MIT License`](https://github.com/adh319/Lunox/blob/main/LICENSE). You are free to use and modify the code, but must include proper attribution:

```
© 2024 adh319@github. This project is available under the MIT License.
You must include proper attribution by linking to the original GitHub repository: https://github.com/adh319/Lunox.
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
[version-url]: https://github.com/adh319/Lunox/blob/main/package.json
[node-shield]: https://img.shields.io/badge/Node-18%2B-43853d?logo=node.js&logoColor=white&style=for-the-badge
[discordjs-shield]: https://img.shields.io/badge/discord.js-v14-5865F2?logo=discord&logoColor=white&style=for-the-badge
[rainlink-shield]: https://img.shields.io/badge/Lavalink%20Client-Rainlink-00bcd4?style=for-the-badge
[spon-img]: https://media.discordapp.net/attachments/979364157541462066/982734017671606322/Vultr_Logo_Download_Vector.png
