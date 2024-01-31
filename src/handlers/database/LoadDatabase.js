const mongoose = require("mongoose");
const { mongoUri } = require("../../settings/config.js");

module.exports = async (client) => {
    try {
        mongoose.set("strictQuery", false);
        mongoose.connect(mongoUri);
    } catch (error) {
        console.log(error);
    }
};
