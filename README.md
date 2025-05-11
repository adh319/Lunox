<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Lunox&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> 
</p>

<p align="center"> 
  A simple yet powerful Discord music bot built with the Lavalink client and Discord.js v14.
</p>

<p align="center"> 
  <a href="https://ko-fi.com/enourdev" target="_blank"> <img src="https://ko-fi.com/img/githubbutton_sm.svg"/> </a>
</p>

<p align="center"> 
  <a href="https://discord.gg/xhTVzbS5NU" target="_blank"> <img src="https://discordapp.com/api/guilds/1056011738950156359/widget.png?style=banner2"/> </a>
</p>

[![Version][version-shield]](version-url) [![MIT License][license-shield]][license-url] [![Contributors][contributors-shield]][contributors-url] [![Stargazers][stars-shield]][stars-url] [![Forks][forks-shield]][forks-url] [![Watchers][watchers-shield]][watchers-url] [![Issues][issues-shield]][issues-url]

---

### `📢` Main Features

- ☑️ Built with **[Rainlink](https://www.npmjs.com/package/rainlink)** Lavalink client
- ☑️ Supports Lavalink v3 and v4
- ☑️ Slash command support
- ☑️ Prefix commands (**dev-only**)
- ☑️ Clean UI
- ☑️ Optimized performance
- ☑️ Beginner-friendly
- ☑️ And much more!

---

### `🎵` Supported Platforms

- ☑️ YouTube & YouTube Music
- ☑️ SoundCloud
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
- Java **`v18`** or higher (for Lavalink)

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

### `🤖` Bots Using This Source Code

If you're using this source code and want your bot listed below, submit a pull request by editing the table with your details:

| No. | Bot Name | Invite Link | Support Server |
| --- | --- | --- | --- |
| `1` | Jive | [Invite Link](https://discord.com/oauth2/authorize?client_id=1019954630551158934) | [Jive Corner](https://discord.gg/kNdSkHchzH) |
| `2` |  |  |  |
| `3` |  |  |  |
| `4` |  |  |  |

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
[spon-img]: https://media.discordapp.net/attachments/979364157541462066/982734017671606322/Vultr_Logo_Download_Vector.png
