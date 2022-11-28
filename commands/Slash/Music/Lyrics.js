const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const { getSong } = require("genius-lyrics-api");

module.exports = {
  name: "lyrics",
  description: "Display lyrics for current played song.",
  category: "Music",
  inVc: true,
  sameVc: true,
  player: true,
  current: true,
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const player = client.poru.players.get(interaction.guild.id);

    try {
      const songName = player.currentTrack.info.title;
      const songArtist = player.currentTrack.info.author;

      let lyricsEmbed = new EmbedBuilder();
      lyricsEmbed.setColor(client.color);
      lyricsEmbed.setFooter({
        text: "Powered by Genius Lyrics",
        iconURL: client.user.displayAvatarURL({ dynamic: true }),
      });
      lyricsEmbed.setTimestamp();

      getSong({
        apiKey: client.config.geniusToken,
        title: songName,
        artist: songArtist,
        optimizeQuery: true,
      }).then((lyrics) => {
        if (lyrics == null) {
          return interaction.editReply({ content: "Lyrics was not found." });
        }
        lyricsEmbed.setTitle(lyrics.title);
        lyricsEmbed.setURL(lyrics.url);
        lyricsEmbed.setThumbnail(lyrics.albumArt);
        try {
          lyricsEmbed.setDescription(lyrics.lyrics);
          return interaction.editReply({
            embeds: [lyricsEmbed],
          });
        } catch (e) {
          return interaction.editReply({
            content: `The lyrics are way too long display. (${lyrics.lyrics.length} > 4096)`,
          });
        }
      });
    } catch (e) {
      return interaction.editReply({
        content: "There was an error getting lyrics for the song.",
      });
    }
  },
};
