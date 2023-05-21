<p align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=200&section=header&text=Lunox&fontSize=80&fontAlignY=35&animation=twinkling&fontColor=gradient"/> 
</p>

<p align="center"> 
  <a href="https://ko-fi.com/adh319" target="_blank"> <img src="https://ko-fi.com/img/githubbutton_sm.svg"/> </a>
</p>

<p align="center"> 
  <a href="https://discord.gg/xhTVzbS5NU" target="_blank"> <img src="https://discordapp.com/api/guilds/1056011738950156359/widget.png?style=banner2"/> </a>
</p>

[![Version][version-shield]](version-url) [![Contributors][contributors-shield]][contributors-url] [![Forks][forks-shield]][forks-url]
[![Watchers][watchers-shield]][watchers-url] [![Stargazers][stars-shield]][stars-url] [![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

# 📒 Table of Contents

[Features](#-features) • [Screenshots](#-screenshots) • [Requirements](#-requirements) • [Installation](#-installation) •
[Configuration & Starting](#-configuration--starting) • [License](#-license) • [Credits](#-credits) • [Support Me](#-support-me) •
[Special Thanks](#-special-thanks) • [Contributors](#-contributors)

#

## 📢 Features

-   ☑️ Used Poru v4 Lavalink Client
-   ☑️ Slash Commands
-   ☑️ Prefix Commands **[Owner Only]**
-   ☑️ Dev/Maintenance Mode System **[Owner Only]**
-   ☑️ Music System
-   ☑️ Custom Filters **[8D, EarRape, Nighcore, Slowmode, Vaporwave]** More? **[Deal With It]**
-   ☑️ 24/7 Voice **[Make Sure You Read This [Note](https://github.com/adh319/Lunox/commit/b4880fb419d9136f96c90411e9b9c2c3c984b384)]**
-   ☑️ AutoPlay **[YouTube Only]**
-   ☑️ Clean UI
-   ☑️ Easy to use
-   ☑️ And Many More...!

## 🖼️ Screenshots

Here are some screenshots from my bot **(Screenshots may not look the same coz i had modify it on my bot)**.

<p align="center">
<img src="https://cdn.discordapp.com/attachments/1014342568554811443/1093098769907732500/image.png"/>  <img src="https://cdn.discordapp.com/attachments/1014342568554811443/1093099116818612234/image.png"/>
</p>

## 🎵 Supported Source

-   ☑️ Youtube
-   ☑️ Youtube Music
-   ☑️ SoundCloud
-   ☑️ Twitch
-   ☑️ Bandcamp
-   ☑️ Vimeo
-   ☑️ Local Files
-   ☑️ Https **[Radio]**

## 📌 Requirements

-   Node.js v17 or higher **[Download](https://nodejs.org/en/download/)**
-   MongoDB v5.0.x or higher **[Download](https://www.mongodb.com/try/download/community-edition)**
-   Java 13+ or higher **[Download JDK13](http://www.mediafire.com/file/m6gk7aoq96db8g0/file)** (i used this version) for LAVALINK!
-   Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
-   LavaLink **[Guide](https://github.com/freyacodes/lavalink)**

## 🎶 More Support Sources

**Require: LavaLink v3.7.x (Recomended Latest Version)**

**☑️ [LavaSrc](https://github.com/TopiSenpai/LavaSrc)**

-   Spotify
-   Deezer
-   Apple Music
-   Yandex Music

**☑️ [skybot-lavalink-plugin](https://github.com/DuncteBot/skybot-lavalink-plugin)**

-   Mixcloud
-   Ocremix
-   Clyp
-   Reddit
-   Getyarn
-   TikTok
-   Po\*\*Hub
-   Soundgasm

## 📝 Installation

```
git clone https://github.com/Enour-Dev/Lunox.git
cd Lunox
npm install
```

## 🚀 Configuration & Starting

Rename `.env.example` to `.env` and fill out these values. You can find the details on `/src/settings/config.js` and make configration there
too (you choose):

```
#########################################
## SEE THE DETAILS ON "/SRC/SETTINGS/CONFIG.JS" FILE ##
#########################################

#BOT DETAILS
TOKEN = #Your bot token
PREFIX = #Your bot prefix
EMBED_COLOR = #Your bot embed color
OWNER_ID = #Your discord id
GUILD_LOGS = #Your guidl channel id for logs
LEAVE_TIMEOUT = 60000 #Time in ms to leave the voice channel after the last user leaves
DISABLE_YOUTUBE = false #Enable or disable youtube feature "true/false". Disabling this will make "autoplay" command useless!!!

#PORU DETAILS
PLAY_SOURCE = ytmsearch #Default source to play the searched songs
NODE_NAME = Lunox #Name of the lavalink, could be anything
NODE_HOST = localhost #Host of the lavalink
NODE_PORT = 2333 #Port of the lavalink
NODE_PASSWORD = youshallnotpass #Password of the lavalink

#LINK DETAILS
MONGO_URI = #Your mongodb uri (mongodb+srv://<username>:<password>@<db_cluster_url>/<db_name>)
SUPPORT_URL = https://discord.gg/kNdSkHchzH #Your support server invite link
VOTE_URL = https://top.gg/bot/1019954630551158934/vote #Your bot vote link
INVITE_URL = https://discord.com/api/oauth2/authorize?client_id=1019954630551158934&permissions=843998162009&scope=bot%20applications.commands #Your bot invite link
IMAGE_URL = #Any direct image link
```

After installation & finished all needed configuration, you can start the bot by either using `npm start` or `node src/sharder.js`.

## 🔐 Licensed

Distributed under the `MIT License`. See [`LICENSE`](https://github.com/Enour-Dev/Lunox/blob/main/LICENSE) for more information.

## 💝 Support Me

-   [Github Sponsor](https://github.com/sponsors/adh319)
-   [PayPal](https://paypal.me/dh319)
-   [Ko-Fi](https://ko-fi.com/adh319)

Also make sure to give a **⭐** to this project if you like it 😉!

## 🙏🏻 Special Thanks

-   [Parasop](https://github.com/parasop)
-   [Adivise](https://github.com/Adivise)
-   [RainyXeon](https://github.com/RainyXeon)
-   [Blacky](https://github.com/brblacky)

## 👥 Contributors

I really appreciated if you guys can contribute to this project. So don't hesitate to make a pull request if you guys has any suggestions,
fixing bugs or want to add more features.

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
