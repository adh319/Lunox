const mongoose = require("mongoose");

const CreateUser = mongoose.Schema({
    Id: { type: String, required: true },
    isPremium: { type: Boolean, default: false },
    premium: {
        redeemedBy: { type: Array, default: null },
        redeemedAt: { type: Number, default: null },
        expiresAt: { type: Number, default: null },
        plan: { type: String, default: null },
    },
    status: {
        isBanned: { type: Boolean, default: false },
        bannedBy: { type: String, default: null },
        bannedAt: { type: Date, default: null },
    },
});

module.exports = mongoose.model("User", CreateUser);
