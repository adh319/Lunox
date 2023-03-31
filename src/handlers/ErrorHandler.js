const { EmbedBuilder } = require("discord.js");

module.exports = async (client) => {
    process.on("unhandledRejection", error => {
        console.log("[AntiCrash] | [UnhandledRejection_Logs] | [start] : ===============");
        console.log(error);
        console.log("[AntiCrash] | [UnhandledRejection_Logs] | [end] : ===============");
    });

    process.on("uncaughtException", error => {
        console.log("[AntiCrash] | [UncaughtException_Logs] | [Start] : ===============");
        console.log(error);
        console.log("[AntiCrash] | [UncaughtException_Logs] | [End] : ===============");
    });

    console.log("[INFO] ErrorHandler Events Loaded!");
};
