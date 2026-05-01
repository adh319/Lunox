const { EmbedBuilder, MessageFlags } = require("discord.js");
const { createPage } = require("../../../functions/createPage.js");
const { convertTime } = require("../../../functions/timeFormat.js");

module.exports = {
    name: "queue",
    description: "Show the queue list",
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
        const formatString = (str, maxLen) => (str && str.length > maxLen ? str.substring(0, maxLen - 3) + "..." : (str || "Unknown"));

        if (player.queue.isEmpty) {
            embed.setDescription(`The queue is empty.`);
            return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
        }

        const queueList = player.queue.map((track, index) => {
            const trackTitle = formatString((track.title || "Unknown").replace(/ - Topic$/, ""), 35);
            const trackArtist = formatString((track.author || "Unknown").replace(/ - Topic$/, ""), 25);
            const trackDuration = track.isStream ? "🔴 LIVE" : convertTime(track.duration || 0);
            const cleanUrl = track.uri || "#";

            return `\`${String(index + 1).padStart(2, "0")}.\` **[${trackTitle}](${cleanUrl})** • \`${trackArtist}\` • \`${trackDuration}\``;
        });

        const totalDuration = player.queue.reduce((acc, t) => acc + (t.duration || 0), 0);

        embed
            .setAuthor({ name: `🎵 Queue - ${player.queue.size} songs`, iconURL: client.user.displayAvatarURL() })
            .setColor(client.config.embedColor)
            .setThumbnail(interaction.guild.iconURL() || null)
            .setFooter({
                text: `Total: ${player.queue.size} songs • ${convertTime(totalDuration)}`,
                iconURL: client.user.displayAvatarURL(),
            });

        const pages = chunkArray(queueList, 10).map((s) => s.join("\n"));
        return createPage(client, interaction, embed, pages);
    },
};

function chunkArray(array, size) {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
}

/**
 * Project: Lunox
 * Author: downyJR
 * Copyright © 2024 downyJR. Licensed under MIT.
 */