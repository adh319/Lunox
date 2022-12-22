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
  permissions: {
    bot: [],
    user: [],
  },
  settings: {
    inVc: true,
    sameVc: true,
    player: true,
    current: true,
    owner: false,
  },
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: false });

    const player = client.poru.players.get(interaction.guild.id);
    const value = interaction.options.getString("search");

    let song = value;
    let CurrentSong = player.currentTrack.info;
    if (!song && CurrentSong) song = CurrentSong.title;

    let lyrics = null;

    const lyricError = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | Lyrics was error to display or not found.`);

    try {
      lyrics = await lyricsfinder(song, "");
      if (!lyrics)
        return interaction.editReply({ embeds: [lyricError] }).then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 12000);
        });
    } catch (err) {
      console.log(err);
      return interaction.editReply({ embeds: [lyricError] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 12000);
      });
    }

    const lyricEmbed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle(`Lyrics for ${song}`)
      .setDescription(`${lyrics}`)
      .setThumbnail(CurrentSong.image)
      .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
      .setTimestamp();

    if (lyrics.length > 4096) {
      lyricEmbed.setDescription(`\`❌\` | Lyrics was too long to display.`);
      //lyricEmbed.setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 2048 }));
    }

    return interaction.editReply({ embeds: [lyricEmbed] });
  },
};
