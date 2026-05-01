const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const { convertTime } = require("../../../functions/timeFormat.js");

module.exports = {
    name: "nowplaying",
    description: "Show the currently playing song with progress",
    category: "music",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: true,
        current: true,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const track = player.queue.current;

        if (!track) {
            embed.setDescription(`🎵 Nothing is playing right now.`);
            return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
        }

        const progress = player.shoukaku.position;
        const duration = track.isStream ? 0 : track.duration;
        const progressBar = createProgressBar(progress, duration);

        const currentTime = track.isStream ? "🔴 LIVE" : convertTime(progress);
        const totalTime = track.isStream ? "🔴 LIVE" : convertTime(duration);

        const title = (track.title || "Unknown").replace(/ - Topic$/, "");
        const author = (track.author || "Unknown").replace(/ - Topic$/, "");

        const autoplayStatus = client.data.get("autoplay", player.guildId) ? "🔄 Autoplay: ON" : "";
        const repeatStatus = player.queue.repeatMode === "track" ? "🔂 Repeat: Track" : player.queue.repeatMode === "queue" ? "🔁 Repeat: Queue" : autoplayStatus;

        embed
            .setAuthor({ name: "🎵 Now Playing", iconURL: client.user.displayAvatarURL() })
            .setDescription(`**[${title}](${track.uri})**`)
            .addFields(
                { name: "👤 Artist", value: `\`${author}\``, inline: true },
                { name: "⏱️ Duration", value: `\`${totalTime}\``, inline: true },
                { name: "🔊 Volume", value: `\`${player.volume}%\``, inline: true },
                { name: "📊 Progress", value: `${progressBar}\n\`${currentTime}\` / \`${totalTime}\``, inline: false },
            )
            .setFooter({ text: repeatStatus || "➿ Autoplay: OFF" });

        if (track.artworkUrl) {
            embed.setThumbnail(track.artworkUrl);
        }

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setCustomId("np-previous").setEmoji("⏮️").setStyle(ButtonStyle.Secondary).setDisabled(player.queue.previous.length === 0),
            new ButtonBuilder().setCustomId("np-pause").setEmoji(player.paused ? "▶️" : "⏸️").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("np-skip").setEmoji("⏭️").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("np-shuffle").setEmoji("🔀").setStyle(ButtonStyle.Secondary),
            new ButtonBuilder().setCustomId("np-stop").setEmoji("⏹️").setStyle(ButtonStyle.Danger),
        );

        return interaction.reply({ embeds: [embed], components: [row] });
    },
};

function createProgressBar(current, total) {
    if (total === 0) return "🔴 **LIVE STREAM**";

    const barLength = 20;
    const progress = Math.min(Math.max(current / total, 0), 1);
    const progressChars = Math.round(progress * barLength);
    const emptyChars = barLength - progressChars;

    const filled = "█".repeat(Math.max(progressChars, 0));
    const empty = "░".repeat(Math.max(emptyChars, 0));
    const percentage = Math.round(progress * 100);

    return `\`\`\`${filled}${empty}\`\`\` \`${percentage}%\``;
}

/**
 * Project: Lunox
 * Author: downyJR
 * Copyright © 2024 downyJR. Licensed under MIT.
 */