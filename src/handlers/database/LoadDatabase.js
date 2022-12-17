const mongoose = require("mongoose");
const { mongoUri } = require("../../settings/config.js");

module.exports = async (client) => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};
