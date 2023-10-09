const mongoose = require("mongoose");

const CreateGuild = mongoose.Schema({
    Id: { type: String, required: true },
    playerControl: { type: String, default: "enable" },
    reconnect: {
        status: { type: Boolean, default: false },
        text: { type: String, default: null },
        voice: { type: String, default: null },
    },
});

module.exports = mongoose.model("Guild", CreateGuild);
