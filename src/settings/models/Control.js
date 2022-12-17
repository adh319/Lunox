const mongoose = require("mongoose");

const CreateControl = mongoose.Schema({
  guild: { type: String, required: true, unique: true },
  playerControl: { type: String, default: "disable", required: true },
});

module.exports = mongoose.model("Control", CreateControl);
