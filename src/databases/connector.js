const mongoose = require("mongoose");

module.exports = async (client) => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(client.config.mongoUri);

        console.log("[INFO] Database events loaded");
    } catch (error) {
        console.error(error);
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
