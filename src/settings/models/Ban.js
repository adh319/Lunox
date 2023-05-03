const mongoose = require("mongoose");

const userban = mongoose.Schema({
    userID: { type: String, required: true },
    isBanned: { type: Boolean, default: false },
    bannedBy: { type: String, default: null },
    bannedAt: { type: Date, default: null },
});

module.exports = mongoose.model("Ban", userban);
