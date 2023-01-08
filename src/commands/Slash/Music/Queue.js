const { EmbedBuilder } = require("discord.js");
const formatDuration = require("../../../structures/FormatDuration.js");

module.exports = {
  name: "queue",
  description: "Show current player queue.",
  category: "Music",
  permissions: {
    bot: [],
    channel: [],
    user: [],
  },
  settings: {
    inVc: false,
    sameVc: true,
    player: true,
    current: true,
    owner: false,
    premium: false,
  },
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const player = client.poru.players.get(interaction.guild.id);

    const npSong = player.currentTrack.info;
    const currentDuration = formatDuration(npSong.length);
    const currentTitle = npSong.title.length > 20 ? npSong.title.substr(0, 20) + "..." : npSong.title;
    const npDuration = npSong.isStream ? "LIVE" : currentDuration;
    const npTitle = npSong.title ? currentTitle : "Unknown";
    const queue = player.queue.length > 10 ? player.queue.slice(0, 10) : player.queue;

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Queue List`, iconURL: interaction.guild.iconURL({ dynamic: true }) })
      .setColor(client.color)
      .setThumbnail(npSong.image)
      .setDescription(`\`__Now Playing__\`\n**[${npTitle}](${npSong.uri})** • \`${npDuration}\` • ${npSong.requester}`)
      .setFooter({ text: `Total Queued • ${player.queue.length} tracks`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    if (queue.length) {
      embed.addFields([
        {
          name: "`__Up Next:__`",
          value: queue
            .map(
              (track, index) =>
                `**${index + 1}. [${
                  track.info.title ? (track.info.title.length > 20 ? track.info.title.substr(0, 20) + "..." : track.info.title) : "Unknown"
                }](${track.info.uri})** • \`${track.info.isStream ? "LIVE" : formatDuration(track.info.length)}\` • ${track.info.requester}`
            )
            .join("\n"),
        },
      ]);
    } else {
      embed.addFields({ name: "`_Up Next__`", value: "**Queue was empty!**" });
    }

    return interaction.editReply({ embeds: [embed] });
  },
};
