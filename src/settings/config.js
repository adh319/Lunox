const { DeezerPlugin } = require("rainlink-deezer");
const { SpotifyPlugin } = require("rainlink-spotify");
const { ApplePlugin } = require("rainlink-apple");
const { VoicePlugin } = require("rainlink-voice");
require("dotenv").config();

module.exports = {
    // GENERAL DETAILS
    token: process.env.TOKEN || " ", // your bot token
    prefix: process.env.PREFIX || "!", // your default prefix
    owner: process.env.OWNER || " ", // your Discord user Id & developer user Id
    dev: process.env.DEV.split(",") || [" "], // your Discord user Id & developer user Id
    embedColor: process.env.EMBED_COLOR || "5865F2", // your embeded hex color
    leaveTimeout: parseInt(process.env.LEAVE_TIMEOUT) || 60000, // leave timeout in milliseconds
    minVolume: parseInt(process.env.MIN_VOLUME) || 1, // min volume
    maxVolume: parseInt(process.env.MAX_VOLUME) || 100, // max volume
    mongoUri: process.env.MONGO_URI || " ", // your MongoDB Uri
    geniusApiKey: process.env.GENIUS_API_KEY || " ", // your genius api key
    supportServerUrl: process.env.SUPPORT_SERVER_URL || " ", // your support server url

    // RAINLINK DETAILS
    rainlinkOptions: {
        resume: true, // whether to resume the player after restart
        resumeTimeout: 5000, // 5 seconds
        retryTimeout: 5000, // 5 seconds
        retryCount: Infinity, // infinity or number
        defaultSearchEngine: process.env.DEFAULT_SEARCH_ENGINE || "youtubeMusic", // default search engine. Available engines: youtubeMusic, youtube, soundcloud, spotify, deezer and apple
        searchFallback: {
            enable: true, // enable search fallback, don't change this if you don't know what you're doing
            engine: "youtube", // search fallback engine, this is the engine that will be used when the default search engine fails and the search fallback is enabled. Available engines: youtubeMusic, youtube, and soundcloud
        },
    },
    rainlinkPlugins: [
        new VoicePlugin(),
        new DeezerPlugin(),
        new SpotifyPlugin({
            clientId: process.env.SPOTIFY_CLIENT_ID || " ", // your Spotify Client Id
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET || " ", // your Spotify Client Secret
            playlistPageLimit: 1,
            albumPageLimit: 1,
            searchLimit: 20,
            searchMarket: "US",
        }),
        new ApplePlugin({
            countryCode: "us", // Default is "us"
            imageWidth: 600, // Default is 600
            imageHeight: 900, // Default is 900
        }),
    ],
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
};

function parseBoolean(value) {
    if (typeof value === "string") value = value.trim().toLowerCase();

    switch (value) {
        case "true":
            return true;
        case "false":
            return false;
        default:
            return false;
    }
}

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
