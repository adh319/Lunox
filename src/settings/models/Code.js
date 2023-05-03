const mongoose = require("mongoose");

// Generate Premium Code
const premiumCode = mongoose.Schema({
    code: { type: String, default: null },
    plan: { type: String, default: null },
});

module.exports = mongoose.model("premium-codes", premiumCode);
