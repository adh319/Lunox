const { ActivityType } = require('discord.js');

module.exports.run = (client) => {
  client.poru.init(client);
  console.log(
    `[API] ${client.user.username} is ready with ${client.guilds.cache.size} server`,
  );

  setInterval(() => {
    const statuses = [
		`/help`,
		`/play`,
	];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    client.user.setActivity(status, { type: ActivityType.Listening });
  }, 6000);
};
