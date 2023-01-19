const mongoose = require("mongoose");

const CreateReconnect = mongoose.Schema({
    guild: { type: String, required: true, unique: true },
    text: { type: String  },
    voice: { type: String },
    time: { type: Number },
});

module.exports = mongoose.model("Reconnect", CreateReconnect);
