const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const fetch = require("node-fetch");

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
        channel: [],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: true,
        owner: false,
        premium: false,
    },
    run: async (client, interaction, player) => {
        await interaction.deferReply({ ephemeral: false });

        const value = interaction.options.getString("search");

        const currentSong = player.currentTrack.info;
        const titles = currentSong.title.replace(/\(Official (Video|Audio|Music Video)\)/gi, "").trim();
        const authors = currentSong.author.replace(/- Topic$/gi, "").trim();

        const lyricEmbed = new EmbedBuilder().setColor(client.color);

        let lyricSong = null;
        let lyricUrl = null;
        let lyricThumbnail = null;
        let lyricAuthor = null;
        let lyricTitle = null;

        try {
            if (value) {
                await fetch(`https://weeb-api.vercel.app/genius?query=${value}`)
                    .then((res) => res.json())
                    .then(async (data) => {
                        const url = data[0].url;
                        const thumbnail = data[0].image;
                        const author = data[0].artist;
                        const title = data[0].title;

                        await fetch(`https://weeb-api.vercel.app/lyrics?url=${url}`)
                            .then((res) => res.json())
                            .then((lyrics) => {
                                lyricSong = lyrics;
                            });

                        lyricUrl = url;
                        lyricThumbnail = thumbnail;
                        lyricAuthor = author;
                        lyricTitle = title;
                    });
            } else {
                await fetch(`https://weeb-api.vercel.app/genius?query=${titles} ${authors}`)
                    .then((res) => res.json())
                    .then(async (data) => {
                        const url = data[0].url;
                        const thumbnail = data[0].image;
                        const author = data[0].artist;
                        const title = data[0].title;

                        await fetch(`https://weeb-api.vercel.app/lyrics?url=${url}`)
                            .then((res) => res.json())
                            .then((lyrics) => {
                                lyricSong = lyrics;
                            });

                        lyricUrl = url;
                        lyricThumbnail = thumbnail;
                        lyricAuthor = author;
                        lyricTitle = title;
                    });
            }
        } catch (err) {
            lyricEmbed.setDescription(`\`❌\` | No lyrics were found!`);

            return interaction.editReply({ embeds: [lyricEmbed], ephemeral: true });
        }

        if (!lyricSong) {
            lyricEmbed.setDescription(`\`❌\` | No lyrics were found!`);

            return interaction.editReply({ embeds: [lyricEmbed], ephemeral: true });
        }

        if (value) {
            if (lyricSong.length > 4096) {
                lyricEmbed.setDescription(`${lyricSong.slice(0, 3900)}\n\n[Click for more](${lyricUrl})`);
            } else {
                lyricEmbed.setDescription(`${lyricSong}\n\n[Click for more](${lyricUrl})`);
            }
        } else {
            if (lyricSong.length > 4096) {
                lyricEmbed.setDescription(`${lyricSong.slice(0, 3900)}\n\n[Click for more](${lyricUrl})`);
            } else {
                lyricEmbed.setDescription(`${lyricSong}\n\n[Click for more](${lyricUrl})`);
            }
        }

        lyricEmbed
            .setAuthor({
                name: `${lyricTitle} by ${lyricAuthor} Lyrics`,
                iconURL: client.user.displayAvatarURL({ size: 2048, dynamic: true }),
            })
            .setThumbnail(lyricThumbnail)
            .setFooter({
                text: `Requested by ${interaction.user.tag}`,
                iconURL: interaction.user.displayAvatarURL({ size: 2048, dynamic: true }),
            })
            .setTimestamp();

        return interaction.editReply({ embeds: [lyricEmbed] });
    },
};
