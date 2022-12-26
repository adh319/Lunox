const { ActivityType } = require("discord.js");

module.exports.run = async (client) => {
  await client.poru.init(client, {
    shards: client.cluster.info.TOTAL_SHARDS,
    clientName: client.user.username,
    clientId: client.user.id,
  });

  console.log(`[INFO] ${client.user.username} is ready with ${client.guilds.cache.size} server`);

  const status = [
    { type: ActivityType.Listening, name: "Lunox" },
    { type: ActivityType.Playing, name: "/help" },
    { type: ActivityType.Watching, name: `${client.guilds.cache.size} Servers` },
    { type: ActivityType.Competing, name: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users` },
  ];

  setInterval(() => {
    const index = Math.floor(Math.random() * status.length);

    client.user.setActivity(status[index].name, { type: status[index].type });
  }, 5000);
};
