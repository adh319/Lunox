const mongoose = require("mongoose");

const CreateControl = mongoose.Schema({
    guild: { type: String, required: true },
    playerControl: { type: String, default: "disable" },
});

module.exports = mongoose.model("Control", CreateControl);
