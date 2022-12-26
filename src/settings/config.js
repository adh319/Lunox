require("dotenv").config();

module.exports = {
  // BOT DETAILS
  token: process.env.TOKEN || " ", // your bot token
  prefix: process.env.PREFIX || "!", // your bot prefix "for owner message command"
  color: process.env.EMBED_COLOR || " ", // your embeded hex color
  owner: process.env.OWNER_ID || " ", // your bot Owners ID
  errorLogs: process.env.ERROR_LOGS || " ", // your error logs Channel ID
  guildLogs: process.env.GUILD_LOGS || " ", // your server join left logs Channel ID
  leaveTimeout: process.env.LEAVE_TIMEOUT || "60000", // set leave TimeOut when bot was alone 1000 = 1sec

  // PORU DETAILS
  playSource: process.env.PLAY_SOURCE || "ytmsearch", // "ytmsearch" / "spotify" / "deezer" / "applemusic". Configuration for "PLAY" command!
  poruOptions: {
    defaultPlatform: process.env.DEFAULT_SOURCE || "ytsearch", // default is = "ytserach", you can change this to "ytmsearch" / "ytsearch" / "scsearch" / "spsearch"
    clientID: process.env.SPOTIFY_ID || " ", // your Spotify Client ID
    clientSecret: process.env.SPOTIFY_SECRET || " ", // your Spotify Client Secret
    reconnectTries: 5, // total attemps to try if reconnect failed. you can change it to "Infinity" for unlimited attemps.
    playlistLimit: 10,
    albumLimit: 10,
    artistLimit: 10,
    searchMarket: "us",
  },
  nodes: [
    {
      name: process.env.NODE_NAME || "Lunox", // lavalink node name (anything you want)
      host: process.env.NODE_HOST || "localhost", // lavalink host
      port: parseInt(process.env.NODE_PORT || "2333"), //lavalink port
      password: process.env.NODE_PASSWORD || "youshallnotpass", //lavalink pass/auth
      secure: parseBoolean(process.env.NODE_SECURE || "false"), //lavalink secure "true/false"
    },
  ],

  // LINK DETAILS
  mongoUri: process.env.MONGO_URI || " ", // your MongoDB Url
  supportUrl: process.env.SUPPORT_URL || "https://discord.gg/kNdSkHchzH", // your Support Server Link [DONT FORGET TO JOIN :)]
  inviteUrl:
    process.env.INVITE_URL ||
    "https://discord.com/api/oauth2/authorize?client_id=1022221914145566815&permissions=294208797777&scope=bot%20applications.commands", // your Bot Invite Link [DONT FORGET TO INVITE MY BOT :)]
  voteUrl: process.env.VOTE_URL || "https://top.gg/bot/1022221914145566815/vote", // your Bot Vote Link [DONT FORGER TO VOTE MY BOT :)]
  imageUrl: process.env.IMAGE_URL || "https://cdn.discordapp.com/attachments/1014342568554811443/1051586923942117427/LUNOX.png", // your Bot Banner Imange Link to use on "help" & "about" command
};

function parseBoolean(value) {
  if (typeof value === "string") {
    value = value.trim().toLowerCase();
  }
  switch (value) {
    case true:
    case "true":
      return true;
    default:
      return false;
  }
}
