const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const lyricsfinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  description: "Display lyrics for current played song.",
  category: "Music",
  options: [
    {
      name: "search",
      description: "Search lyric for specific song.",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction, user) => {
    await interaction.deferReply({ ephemeral: false });

    const player = client.poru.players.get(interaction.guild.id);
    const value = interaction.options.getString("search");

    let song = value;
    let CurrentSong = player.currentTrack.info;
    let CurrentAuthor = player.currentTrack.info.author;
    if (!song && CurrentSong) song = CurrentSong.title;

    let lyrics = null;

    try {
      lyrics = await lyricsfinder(song, CurrentAuthor);
      if (!lyrics)
        return interaction.editReply("Lyrics was not found.");
    } catch (err) {
      console.log(err);
      return interaction.editReply("Lyrics was not found.");
    }

    const embed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`Lyrics for ${song}`)
      .setDescription(`${lyrics}`)
      .setFooter({ text: `Requested by ${interaction.user.username}` })
      .setTimestamp();

    if (lyrics.length > 4096) {
      embed.data.description("Lyrics was too long to display.");
    }

    return interaction.editReply({ embeds: [embed] });
  },
};
