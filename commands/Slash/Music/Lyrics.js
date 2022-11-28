const { EmbedBuilder } = require("discord.js");
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
    const player = client.poru.players.get(interaction.guild.id);

    try {
      const songName = player.currentTrack.info.title;

      let lyricsEmbed = new EmbedBuilder();
      lyricsEmbed.setColor(client.color);
      lyricsEmbed.setFooter({
        text: "Powered by Genius Lyrics",
        iconURL:
          "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1435674560/mjmgr50tv69vt5pmzeib.png",
      });
      lyricsEmbed.setTimestamp();

      getSong({
        apiKey: client.config.geniusToken,
        title: songName,
        artist: " ",
        optimizeQuery: true,
      }).then((lyrics) => {
        if (lyrics == null) {
          return interaction.reply({
            content: "Lyrics was not found.",
            ephemeral: true,
          });
        }
        lyricsEmbed.setTitle(lyrics.title);
        lyricsEmbed.setURL(lyrics.url);
        lyricsEmbed.setThumbnail(lyrics.albumArt);
        try {
          lyricsEmbed.setDescription(lyrics.lyrics);
          return interaction.reply({
            embeds: [lyricsEmbed],
          });
        } catch (e) {
          return interaction.reply({
            content: `The lyrics are way too long display. (${lyrics.lyrics.length} > 4096)`,
            ephemeral: true,
          });
        }
      });
    } catch (e) {
      return interaction.reply({
        content: "There was an error getting lyrics for the song.",
        ephemeral: true,
      });
    }
  },
};
