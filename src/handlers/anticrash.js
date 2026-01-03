const Logger = require("../utils/logger");

module.exports = async () => {
    process.on("unhandledRejection", async (reason, promise) => {
        Logger.anticrash("UnhandledRejection_Logs", "[start] : ===============");
        Logger.error("Unhandled Rejection at:", promise, "reason:", reason);
        Logger.anticrash("UnhandledRejection_Logs", "[end] : ===============");
    });

    process.on("uncaughtException", async (err, origin) => {
        Logger.anticrash("UncaughtException_Logs", "[Start] : ===============");
        Logger.error(`Uncaught exception: ${err}\n` + `Exception origin: ${origin}`);
        Logger.anticrash("UncaughtException_Logs", "[End] : ===============");
    });

    process.on("uncaughtExceptionMonitor", async (err, origin) => {
        Logger.anticrash("UncaughtExceptionMonitor_Logs", "[Start] : ===============");
        Logger.error(`Uncaught exception monitor: ${err}\n` + `Exception origin: ${origin}`);
        Logger.anticrash("UncaughtExceptionMonitor_Logs", "[End] : ===============");
    });

    Logger.info("Anticrash events loaded");
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
