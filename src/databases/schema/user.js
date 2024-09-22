const mongoose = require("mongoose");

const createUser = mongoose.Schema({
    id: { type: String, required: true },
    ban: {
        status: { type: Boolean, default: false },
        reason: { type: String, default: null },
    },
});

module.exports = mongoose.model("user", createUser);

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
