const mongoose = require("mongoose");

const createGuild = mongoose.Schema({
    id: { type: String, required: true },
    reconnect: {
        status: { type: Boolean, default: false },
        text: { type: String, default: null },
        voice: { type: String, default: null },
    },
});

module.exports = mongoose.model("guild", createGuild);

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
