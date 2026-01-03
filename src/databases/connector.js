const mongoose = require("mongoose");
const Logger = require("../utils/logger");

module.exports = async (client) => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(client.config.mongoUri);

        Logger.info("Database events loaded");
    } catch (error) {
        Logger.error("Failed to connect to database:", error);
    }
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
