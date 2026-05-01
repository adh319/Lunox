const { EmbedBuilder, MessageFlags } = require("discord.js");
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

        try {
            if (player && player.voiceId !== interaction.member.voice.channelId) {
                embed.setDescription(`You must be in the same voice channel as the bot.`);
                return interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }

            const query = interaction.options.getString("query");
            await interaction.reply({ embeds: [embed.setDescription(`🔍 Searching for \`${query}\`...`)] });

            const result = await client.rainlink.search(query, { requester: interaction.member, sourceID: client.config.lavalinkSource });

            if (!result || result.type === "EMPTY" || result.type === "ERROR" || !result.tracks.length) {
                return interaction.editReply({ embeds: [embed.setDescription(`❌ No results found for \`${query}\``)] });
            }

            if (!player) {
                player = await client.rainlink.create({
                    guildId: interaction.guildId,
                    textId: interaction.channelId,
                    voiceId: interaction.member.voice.channelId,
                    shardId: interaction.guild.shardId,
                    volume: client.config.defaultVolume,
                    deaf: true,
                });
            }

            const formatTrack = (title, author) => {
                const cleanTitle = (title || "Unknown").replace(/ - Topic$/, "");
                const cleanAuthor = (author || "Unknown").replace(/ - Topic$/, "");
                return { title: cleanTitle, author: cleanAuthor };
            };

            if (result.type === "PLAYLIST") {
                for (const track of result.tracks) player.queue.add(track);

                const totalDuration = result.tracks.reduce((acc, t) => acc + (t.duration || 0), 0);
                const startPosition = Math.max(1, player.queue.size - result.tracks.length + 1);

                embed
                    .setDescription(`📋 Added **[${result.playlistName}](${query})**`)
                    .addFields(
                        { name: "🎵 Songs", value: `\`${result.tracks.length}\``, inline: true },
                        { name: "⏱️ Duration", value: `\`${convertTime(totalDuration)}\``, inline: true },
                        { name: "📍 Position", value: `\`#${startPosition}\` in queue`, inline: true },
                    );
            } else {
                const track = result.tracks[0];
                const { title, author } = formatTrack(track.title, track.author);

                player.queue.add(track);

                embed
                    .setDescription(`🎵 Added **[${title}](${track.uri})**`)
                    .addFields(
                        { name: "👤 Artist", value: `\`${author}\``, inline: true },
                        { name: "⏱️ Duration", value: `\`${track.isStream ? "🔴 LIVE" : convertTime(track.duration)}\``, inline: true },
                        { name: "📍 Position", value: `\`#${player.queue.size}\` in queue`, inline: true },
                    );
            }

            await interaction.editReply({ embeds: [embed] });
            if (!player.playing) return player.play();

        } catch (error) {
            client.logger?.error(`Play command error: ${error.message}`);
            embed.setDescription(`❌ An error occurred while processing your request.`);
            return interaction.editReply({ embeds: [embed] }).catch(() => interaction.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] }));
        }
    },
};

/**
 * Project: Lunox
 * Author: downyJR
 * Copyright © 2024 downyJR. Licensed under MIT.
 */