const { white, red } = require("chalk");

module.exports.run = async (client, player) => {

	const channel = client.channels.cache.get(player.textChannel);
	if (!channel) return;

	console.log(white("[") + red("DEBUG") + white("] ") + red("Player Destroyed from (") + white(`${player.guildId}`) + red(")"));
};
