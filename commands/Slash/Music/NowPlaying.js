const { EmbedBuilder } = require("discord.js");
const formatDuration = require("../../../structures/FormatDuration.js");
const capital = require("node-capitalize");

module.exports = {
  name: "nowplaying",
  description: "Show the current playing song.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: (client, interaction) => {
    const player = client.poru.players.get(interaction.guildId);

    const sources = capital(player.currentTrack.info.sourceName);
    const currentPosition = formatDuration(player.position);
    const trackDuration = formatDuration(player.currentTrack.info.length);
    const Part = Math.floor(
      (player.position / player.currentTrack.info.length) * 30
    );
    const Emoji = player.isPlaying ? "🕒 |" : "⏸ |";

    const embed = new EmbedBuilder()
      .setAuthor({
        name: player.isPlaying ? `Now Playing` : `Song Paused`,
        iconURL:
          "https://cdn.discordapp.com/attachments/1014342568554811443/1025740239236517908/music-disc.gif",
      })
      .setThumbnail(player.currentTrack.info.image)
      .setDescription(
        `**[${player.currentTrack.info.title}](${player.currentTrack.info.uri})**`
      )
      .addFields({
        name: `Author:`,
        value: `${player.currentTrack.info.author}`,
        inline: true,
      })
      .addFields({
        name: `Requested By:`,
        value: `${player.currentTrack.info.requester}`,
        inline: true,
      })
      .addFields({ name: `Source:`, value: `${sources}`, inline: true })
      .addFields({ name: `Duration:`, value: `${trackDuration}`, inline: true })
      .addFields({
        name: `Volume:`,
        value: `${player.filters.volume * 100}%`,
        inline: true,
      })
      .addFields({
        name: `Queue Left:`,
        value: `${player.queue.length}`,
        inline: true,
      })
      .addFields({
        name: `Song Progress: \`[${currentPosition}]\``,
        value: `\`\`\`${Emoji} ${
          "─".repeat(Part) + "🔵" + "─".repeat(30 - Part)
        }\`\`\``,
        inline: false,
      })
      .setColor(client.color)
      .setTimestamp();

    return interaction.reply({ embeds: [embed] });
  },
};
