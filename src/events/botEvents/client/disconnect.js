const { white, yellow } = require("chalk");

module.exports.run = async (client) => {
  console.log(
    white("[") + yellow("WARN") + white("] ") + yellow("Disconnected ") + white(`${client.user.tag} (${client.user.id})`) + yellow(" ")
  );
};
