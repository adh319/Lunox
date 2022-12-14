require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || " ", // your bot token
  prefix: process.env.PREFIX || " ", // your bot prefix "for owner message command"
  color: process.env.EMBED_COLOR || " ", // your embeded hex color
  owner: process.env.OWNER_ID || " ", // your bot Owners ID
  playSource: process.env.PLAY_SOURCE || "ytmsearch", // default search engine & "ytmsearch" / "spotify" / "deezer" / "apple"
  geniusToken: process.env.GENIUS_TOKEN || " ", // your genius client access token
  poruOptions: {	  
      defaultPlatform: process.env.DEFAULT_SOURCE || " ", // default search engine & "ytmsearch" / "ytsearch" / "scsearch" / "spsearch"
      clientID: process.env.SPOTIFY_ID || " ", // your Spotify Client ID
      clientSecret: process.env.SPOTIFY_SECRET || " ", // your Spotify Client Secret
      resumeKey: "Lunox", // Dont know what it is xD.  I put it as it recomended on poru
      reconnectTries: Infinity, // total attemps to try if reconnect failed. you can change it to "Infinity" for unlimited attemps.
      reconnectTime: 0, // time to take when reconnect
      resumeTimeout: 60, // Dont know what it is xD.  I put it as it recomended on poru
      playlistLimit: 10,
      albumLimit: 10,
      artistLimit: 10,
      searchMarket: "us",
  },
  nodes: [
    {
      name: process.env.NODE_NAME || " ", // lavalink node name (anything you want)
      host: process.env.NODE_HOST || " ", // lavalink host
      port: parseInt(process.env.NODE_PORT || " "), //lavalink port
      password: process.env.NODE_PASSWORD || " ", //lavalink pass/auth
      secure: parseBoolean(process.env.NODE_SECURE || " "), //lavalink secure "true/false"
    },
  ],
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
