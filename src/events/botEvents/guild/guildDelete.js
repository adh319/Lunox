const { ChannelType, EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, guild) => {
  const channel = client.channels.cache.get(client.config.guildLogs);

  let own = await guild?.fetchOwner();
  let text;

  guild.channels.cache.forEach((c) => {
    if (c.type === ChannelType.GuildText && !text) text = c;
  });

  const embed = new EmbedBuilder()
    .setTitle(`\`📤\` Lefted a server!`)
    .addFields([
      { name: "Name", value: `\`\`\`${guild.name}\`\`\``, inline: true },
      { name: "ID", value: `\`\`\`${guild.id}\`\`\``, inline: true },
      { name: "Member Count", value: `\`\`\`${guild.memberCount} Members\`\`\``, inline: true },
      {
        name: "Owner",
        value: `\`\`\`${guild.members.cache.get(own.id) ? guild.members.cache.get(own.id).user.tag : "Unknown user"} | ${own.id}\`\`\``,
      },
      { name: "Creation Date", value: `\`\`\`${moment.utc(guild.createdAt).format("DD/MMM/YYYY")}\`\`\`` },
      { name: `${client.user.username}'s Server Count`, value: `\`\`\`${client.guilds.cache.size} Servers\`\`\`` },
    ])
    .setColor(client.color)
    .setTimestamp();

  if (guild.iconURL()) {
    embed.setThumbnail(guild.iconURL({ size: 2048 }));
  } else {
    embed.setThumbnail(client.user.displayAvatarURL({ size: 2048 }));
  }

  if (guild.bannerURL()) {
    embed.setImage(guild.bannerURL());
  } else {
    embed.setImage(client.config.imageUrl);
  }

  channel.send({ embeds: [embed] });
};
