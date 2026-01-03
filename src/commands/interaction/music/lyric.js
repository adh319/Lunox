const { EmbedBuilder, MessageFlags, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { find } = require("llyrics");
const gsearch = require("google-search-url");

module.exports = {
    name: "lyric",
    description: "Get the lyric of the current song",
    category: "music",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: true,
        player: true,
        current: true,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const formatText = (text) =>
            text
                .replace(/\(.*?\)/gi, "")
                .replace(/\s/g, "-")
                .replace(/['",]/g, "")
                .replace(/ - Topic$/, "")
                .toLowerCase();

        const track = player.queue.current;
        const trackTitle = formatText(track.title);
        const trackArtist = formatText(track.author);
        const lyricText = await lyricFind(trackTitle, trackArtist);
        const loadingEmbed = new EmbedBuilder().setColor(client.config.embedColor).setDescription(`Please wait...!`);
        const loadingMsg = await interaction.reply({ embeds: [loadingEmbed] });

        if (!lyricText) {
            embed.setDescription(`No lyrics found. Please try again later.`);

            if (loadingMsg) {
                return loadingMsg.edit({ embeds: [embed] });
            } else {
                return interaction.reply({ embeds: [embed] });
            }
        }

        if (lyricText.length <= 4096) {
            embed
                .setAuthor({
                    name: `${client.user.username} Lyrics`,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setThumbnail(track.artworkUrl)
                .setDescription(lyricText);

            if (loadingMsg) {
                return loadingMsg.edit({ embeds: [embed] });
            } else {
                return interaction.reply({ embeds: [embed] });
            }
        } else {
            embed
                .setAuthor({
                    name: `${client.user.username} Lyrics`,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setThumbnail(track.artworkUrl)
                .setDescription(lyricText.substring(0, 4096));

            const lyricUrl = gsearch.craft({ query: `${trackTitle} ${trackArtist} lyrics` }).url;
            const lyricButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setURL(lyricUrl.replace("http:", "https:")).setLabel("Full Lyrics").setStyle(ButtonStyle.Link),
            );

            if (loadingMsg) {
                return loadingMsg.edit({ embeds: [embed], components: [lyricButton] });
            } else {
                return interaction.editReply({ embeds: [embed], components: [lyricButton] });
            }
        }
    },
};

async function lyricFind(title, author) {
    const response = await find({
        song: title,
        artist: author,
        engine: "youtube",
        forceSearch: true,
    });
    const lyricSong = response.lyrics;

    return lyricSong;
}

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
