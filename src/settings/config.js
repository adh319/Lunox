require("dotenv").config();
const { customFilter, AppleMusic, Deezer, Spotify } = require("ruvyrias");

const deezer = new Deezer();
const applemusic = new AppleMusic({ 
    countryCode: 'us',
    apiKey: process.env.APIKEY || " ",
});
const spotify = new Spotify({
    clientID: process.env.SPOTIFY_ID || " ",
    clientSecret: process.env.SPOTIFY_SECRET || " ",
    clients: [{ clientID: process.env.SPOTIFY_ID || " ", clientSecret: process.env.SPOTIFY_SECRET || " " }], // its seem this is a bug from the plugin, so if u dont add this, it will throw an error.
});

module.exports = {
    // BOT DETAILS
    token: process.env.TOKEN || " ", // your bot token
    prefix: process.env.PREFIX || "!", // your bot prefix "for owner message command"
    color: process.env.EMBED_COLOR || " ", // your embeded hex color
    owner: process.env.OWNER_ID || " ", // your bot Owners ID
    guildLogs: process.env.GUILD_LOGS || " ", // your server join left logs Channel ID
    leaveTimeout: process.env.LEAVE_TIMEOUT || "60000", // set leave TimeOut when bot was alone 1000 = 1sec
    disablePremium: parseBoolean(process.env.DISABLE_PREMIUM || "false"), // disable premium command

    // Ruvyrias DETAILS
    RuvyriasOptions: {
        customFilter,
        library: "discord.js", // This source made by using discord.js, so don't even try to change this thing :)
        defaultPlatform: process.env.DEFAULT_PLATFORM || " ", // recomended using "ytmsearch". You can change this to: "ytsearch" / "ytmsearch" / "scsearch". More Audio Source? Use Lavasrc plugin.
        plugins: [applemusic, deezer, spotify], // Enable applemusic/deezer/spotify LINK to be readable by ruvyrias without using LavaSrc plugin.
        reconnectTries: Infinity, // total attemps to try if reconnect failed. you can change it to "Infinity" for unlimited attemps.
        reconnectTimeout: 10000, // total time to try reconnect in ms. 1000 = 1sec
    },
    nodes: [
        {
            name: " ", // lavalink node name (anything you want)
            host: " ", // lavalink host
            port: parseInt(" "), //lavalink port
            password: " ", //lavalink pass/auth
            secure: parseBoolean("false"), //lavalink secure "true/false"
        },
    ],

    // LINK DETAILS
    mongoUri: process.env.MONGO_URI || " ", // your MongoDB Url
    supportUrl: process.env.SUPPORT_URL || " ", // your Support Server Link
    inviteUrl: process.env.INVITE_URL || " ", // your Bot Invite Link
    imageUrl: process.env.IMAGE_URL || " ", // your Bot Banner Imange Link to use on "help" & "about" command
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
