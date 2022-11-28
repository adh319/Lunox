const { EmbedBuilder } = require("discord.js");
const formatDuration = require("../../../structures/FormatDuration.js");

module.exports = {
  name: "queue",
  description: "Show current player queue.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guild.id);

    const currentDuration = formatDuration(player.currentTrack.info.length);
    const queue = player.queue.length > 10 ? player.queue.slice(0, 10) : player.queue;

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Queue List`,
        iconURL: interaction.guild.iconURL({ dynamic: true }),
      })
      .setColor(client.color)
      .setThumbnail(player.currentTrack.info.image)
      .setDescription(
        `Now Playing\n**[${player.currentTrack.info.title}](${player.currentTrack.info.uri})** • \`${currentDuration}\``
      )
      .setFooter({
        text: `Total Queued • ${player.queue.length} tracks`,
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    if (queue.length)
      embed.addFields([
        {
          name: "Up Next",
          value: queue
            .map(
              (track, index) =>
                `**${index + 1}.** [${track.info.title}](${
                  track.info.uri
                }) • \`${formatDuration(track.info.length)}\``
            )
            .join("\n"),
        },
      ]);

    return interaction.reply({ embeds: [embed] });
  },
};
