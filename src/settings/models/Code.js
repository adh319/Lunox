const mongoose = require("mongoose");

// Generate Premium Code
const premiumCode = mongoose.Schema({
    code: { type: mongoose.SchemaTypes.String, default: null },
    // Set the expire date and time. <Day, Week, Month, Year>
    expiresAt: { type: mongoose.SchemaTypes.Number, default: null },
    // Set the plan <Day, Week, Month>.
    plan: { type: mongoose.SchemaTypes.String, default: null },
});

module.exports = mongoose.model("premium-codes", premiumCode);
