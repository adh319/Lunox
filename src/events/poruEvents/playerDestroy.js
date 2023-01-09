const { white, red } = require("chalk");

module.exports.run = async (client, player) => {
    console.log(white("[") + red("DEBUG") + white("] ") + red("Player Destroyed from (") + white(`${player.guildId}`) + red(")"));
};
