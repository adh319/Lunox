const { EmbedBuilder } = require("discord.js");
const { convertTime } = require("../../../functions/timeFormat.js");

module.exports = {
    name: "play",
    description: "Play a song",
    category: "music",
    options: [
        {
            name: "query",
            description: "Provide a song name or url",
            type: 3,
            required: true,
        },
    ],
    permissions: {
        bot: ["Speak", "Connect"],
        user: ["Speak", "Connect"],
    },
    settings: {
        voice: true,
        player: false,
        current: false,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);

        if (player && player.voiceId !== interaction.member.voice.channelId) {
            embed.setDescription(`You must be in the same voice channel as the bot.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const query = interaction.options.getString("query");
        const result = await client.rainlink.search(query, { requester: interaction.member });

        if (result.type === "EMPTY" || result.type === "ERROR" || !result.tracks.length) {
            embed.setDescription(`No results found for your query.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (!player) {
            player = await client.rainlink.create({
                guildId: interaction.guildId,
                textId: interaction.channelId,
                voiceId: interaction.member.voice.channelId,
                shardId: interaction.guild.shardId,
                deaf: true,
            });
        }

        if (result.type === "PLAYLIST") {
            for (const track of result.tracks) player.queue.add(track);

            embed.setDescription(`Added **[${result.playlistName}](${query})** - \`${result.tracks.length}\` songs to the queue.`);
        } else {
            const track = result.tracks[0];
            const trackTitle = formatString(track.title, 30).replace(/ - Topic$/, "") || "Unknown";
            const trackAuthor = formatString(track.author, 25).replace(/ - Topic$/, "") || "Unknown";

            player.queue.add(track);

            embed.setDescription(`Added **[${trackTitle} - ${trackAuthor}](${track.uri})** - \`${convertTime(track.duration)}\`.`);
        }

        await interaction.reply({ embeds: [embed] });

        if (!player.playing) return player.play();
    },
};

function formatString(str, maxLength) {
    return str.length > maxLength ? str.substr(0, maxLength - 3) + "..." : str;
}

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
