const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const formatDuration = require("../../../structures/FormatDuration.js");

module.exports = {
  name: "play",
  description: "Play your favorite song/s.",
  category: "Music",
  inVc: true,
  sameVc: true,
  options: [
    {
      name: "query",
      description: "Provide song name/url.",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    let player = client.poru.players.get(interaction.guild.id);
    if (!player) {
      player = await client.poru.createConnection({
        guildId: interaction.guildId,
        voiceChannel: interaction.member.voice.channelId,
        textChannel: interaction.channel.id,
        deaf: true,
      });
    }

    const song = interaction.options.getString("query");
    const source = client.config.playSource;

    const res = await client.poru.resolve(song, source); // You can remove 'spotify' for default Or change it to 'deezer' or 'apple' (currently maintenance).
    const { loadType, tracks, playlistInfo } = res;

    if (player.state !== "CONNECTED") player.connect();

    if (loadType === "PLAYLIST_LOADED") {
      for (const track of res.tracks) {
        track.info.requester = interaction.member;
        await player.queue.add(track);
      }
      const track = tracks.shift();

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `☑️ **[${playlistInfo.name}](${song})** • \`${tracks.length}\` tracks • ${track.info.requester}`
        );

      await interaction.reply({ embeds: [embed] });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else if (loadType === "SEARCH_RESULT" || loadType === "TRACK_LOADED") {
      const track = tracks.shift();

      track.info.requester = interaction.member;
      await player.queue.add(track);

      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(
          `☑️ **[${track.info.title}](${track.info.uri})** • \`${formatDuration(
            track.info.length
          )}\` • ${track.info.requester}`
        );

      await interaction.reply({ embeds: [embed] });
      if (!player.isPlaying && !player.isPaused) return player.play();
    } else if (loadType === "LOAD_FAILED") {
      const embed = new EmbedBuilder()
        .setColor(client.color)
        .setDescription(`\`❌\` | Failed to load track!`);

      return interaction.reply({ embeds: [embed], ephemeral: true });
      player.destroy();
    }
  },
};
