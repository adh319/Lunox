const mongoose = require("mongoose");

const CreateCode = mongoose.Schema({
    code: { type: String, default: null },
    plan: { type: String, default: null },
});

module.exports = mongoose.model("Code", CreateCode);
