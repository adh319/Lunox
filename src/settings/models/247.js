const mongoose = require("mongoose");

const CreateReconnect = mongoose.Schema({
    guild: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    voice: { type: String, required: true },
    time: { type: Number },
});

module.exports = mongoose.model("Reconnect", CreateReconnect);
