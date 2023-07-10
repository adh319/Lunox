const mongoose = require("mongoose");

const premiumCode = mongoose.Schema({
    code: { type: String, default: null },
    plan: { type: String, default: null },
});

module.exports = mongoose.model("Code", premiumCode);
