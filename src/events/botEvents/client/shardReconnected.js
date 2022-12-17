const { white, yellow } = require("chalk");

module.exports.run = async (client, id) => {
  console.log(white("[") + yellow("WARN") + white("] ") + yellow("Shard ") + white(id) + yellow(" Shard Reconnected!"));
};
