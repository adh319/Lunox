require("dotenv").config();

module.exports = {
  token: process.env.TOKEN || " ",  // your bot token
  prefix: process.env.PREFIX || " ",  // your bot prefix "for owner message command"
  color: process.env.EMBED_COLOR || " ", // your embeded hex color
  owner: process.env.OWNER_ID || " ", // your bot Owners ID
  geniusToken: process.env.GENIUS_TOKEN || " ", // your genius client access token
  spotifyId: process.env.SPOTIFY_ID || " ", // your Spotify Client ID
  spotifySecret: process.env.SPOTIFY_SECRET || " ", // your Spotify Client Secret
  nodes: [
    {
      name: process.env.NODE_NAME || " ", // lavalink node name (anything you want)
      host: process.env.NODE_HOST || " ", // lavalink host
      port: parseInt(process.env.NODE_PORT || " "), //lavalink port
      password: process.env.NODE_PASSWORD || " ", //lavalink pass/auth
      secure: parseBoolean(process.env.NODE_SECURE || " "), //lavalink secure "true/false"
    }
  ]
};

function parseBoolean(value) {
  if (typeof (value) === 'string') {
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
