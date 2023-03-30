const { EmbedBuilder } = require("discord.js");
const channels = require("../settings/config.js");

module.exports = async (client) => {
    process.on("beforeExit", (code) => {
        console.log("[AntiCrash] | [BeforeExit_Logs] | [Start] : ===============");
        console.log(code);
        console.log("[AntiCrash] | [BeforeExit_Logs] | [End] : ===============");
    });

    process.on("exit", (error) => {
        console.log("[AntiCrash] | [Exit_Logs] | [Start]  : ===============");
        console.log(error);
        console.log("[AntiCrash] | [Exit_Logs] | [End] : ===============");
    });

    process.on("unhandledRejection", async (reason, promise) => {
        console.log("[AntiCrash] | [UnhandledRejection_Logs] | [start] : ===============");
        console.log(reason, promise);
        console.log("[AntiCrash] | [UnhandledRejection_Logs] | [end] : ===============");

        let errorLogsChannel = client.channels.cache.get(channels.errorLogs);

        if (!errorLogsChannel) errorLogsChannel = await client.channels.fetch(channels.errorLogs);
        const errEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`An error was occured with "unhandledRejection":`)
            .setDescription(`\`\`\`${reason}\`\`\``)
            .setTimestamp();

        if (errorLogsChannel) {
            await errorLogsChannel.send({ embeds: [errEmbed] });
        }
    });

    process.on("rejectionHandled", (promise) => {
        console.log("[AntiCrash] | [RejectionHandled_Logs] | [Start] : ===============");
        console.log(promise);
        console.log("[AntiCrash] | [RejectionHandled_Logs] | [End] : ===============");
    });

    process.on("uncaughtException", async (err, origin) => {
        console.log("[AntiCrash] | [UncaughtException_Logs] | [Start] : ===============");
        console.log(err, origin);
        console.log("[AntiCrash] | [UncaughtException_Logs] | [End] : ===============");

        let errorLogsChannel = client.channels.cache.get(channels.errorLogs);

        if (!errorLogsChannel) errorLogsChannel = await client.channels.fetch(channels.errorLogs);
        const errEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle(`An error was occured with "uncaughtException":`)
            .setDescription(`\`\`\`${err}\`\`\``)
            .setTimestamp();

        if (errorLogsChannel) {
            await errorLogsChannel.send({ embeds: [errEmbed] });
        }
    });

    process.on("uncaughtExceptionMonitor", (err, origin) => {
        console.log("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [Start] : ===============");
        console.log(err, origin);
        console.log("[AntiCrash] | [UncaughtExceptionMonitor_Logs] | [End] : ===============");
    });

    process.on("warning", (warning) => {
        console.log("[AntiCrash] | [Warning_Logs] | [Start] : ===============");
        console.log(warning);
        console.log("[AntiCrash] | [Warning_Logs] | [End] : ===============");
    });

    //process.on("SIGINT", () => {
    //console.log("☆・[AntiCrash] | [SIGINT]・☆");
    //});

    console.log("[INFO] ErrorHandler Events Loaded!");
};
