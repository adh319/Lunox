const { ActivityType } = require("discord.js");

module.exports.run = async (client) => {
	client.poru.init(client);

	console.log(`[INFO] ${client.user.username} is ready with ${client.guilds.cache.size} server`);

	const status = [
		{ type: ActivityType.Listening, name: `${client.user.username}` },
		{ type: ActivityType.Playing, name: "/help" },
		{ type: ActivityType.Watching, name: `${client.guilds.cache.size} Servers` },
		{ type: ActivityType.Competing, name: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users` },
	];

	setInterval(() => {
		const index = Math.floor(Math.random() * (status.length - 1) + 1);

		client.user.setActivity(status[index].name, { type: status[index].type });
	}, 5000);
};
