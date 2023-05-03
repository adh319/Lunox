const mongoose = require("mongoose");

const CreateReconnect = mongoose.Schema({
    guild: { type: String, required: true },
    text: { type: String, default: null },
    voice: { type: String, default: null },
    time: { type: Number, default: null }, // disable this if you set the premium to false
});

module.exports = mongoose.model("Reconnect", CreateReconnect);
