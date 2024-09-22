const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");
const { convertTime } = require("../../../functions/timeFormat.js");

module.exports = async (client, player, track) => {
    if (!player) return;

    const formatString = (str, maxLength) => (str.length > maxLength ? str.substr(0, maxLength - 3) + "..." : str);
    const trackTitle = formatString(track.title || "Unknown", 30).replace(/ - Topic$/, "");
    const trackAuthor = formatString(track.author || "Unknown", 25).replace(/ - Topic$/, "");
    const trackDuration = track.isStream ? "LIVE" : convertTime(track.duration);
    const playerEmoji = client.emoji.player;

    const trackMsg = new EmbedBuilder()
        .setAuthor({ name: player.paused ? "Song Paused" : "Now Playing", iconURL: client.user.displayAvatarURL() })
        .setColor(client.config.embedColor)
        .setThumbnail(track.artworkUrl)
        .setDescription(`**[${trackTitle} - ${trackAuthor}](${track.uri})**`)
        .setFields(
            { name: "Duration", value: `\`${convertTime(track.duration)}\``, inline: true },
            { name: "Requested by", value: `${track.requester}`, inline: true },
            { name: "Source", value: `${capitalize(track.source)}`, inline: true },
        );

    const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId("pause")
            .setEmoji(player.paused ? playerEmoji.resume : playerEmoji.pause)
            .setStyle(player.paused ? ButtonStyle.Primary : ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("voldown").setEmoji(playerEmoji.voldown).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("volup").setEmoji(playerEmoji.volup).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("loop").setEmoji(playerEmoji.loop).setStyle(ButtonStyle.Secondary),
    );

    const button2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("shuffle").setEmoji(playerEmoji.shuffle).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("prev").setEmoji(playerEmoji.previous).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("skip").setEmoji(playerEmoji.skip).setStyle(ButtonStyle.Secondary),
        new ButtonBuilder().setCustomId("stop").setEmoji(playerEmoji.stop).setStyle(ButtonStyle.Danger),
    );

    const nplaying = await client.channels.cache.get(player.textId).send({ embeds: [trackMsg], components: [button, button2] });
    player.message = nplaying;

    const embed = new EmbedBuilder().setColor(client.config.embedColor);
    const collector = nplaying.createMessageComponentCollector();

    collector.on("collect", async (message) => {
        if (!player) return collector.stop();

        // Prevent user from using buttons if they are not in the same voice channel
        if (!message.member.voice.channel || player.voiceId !== message.member.voice.channelId) {
            embed.setDescription(`You must be in the same voice channel as the bot.`);

            return message.reply({ embeds: [embed], ephemeral: true });
        }

        // Prevent user from using buttons if they are not the requester
        if (message.user.id !== track.requester.id) {
            embed.setDescription(`Only the requester can use this button.`);

            return message.reply({ embeds: [embed], ephemeral: true });
        }

        switch (message.customId) {
            case "pause":
                if (!player.paused) {
                    message.deferUpdate();

                    player.pause();

                    button.components[0].setEmoji(playerEmoji.resume).setStyle(ButtonStyle.Primary);
                    trackMsg.setAuthor({ name: "Song Paused", iconURL: client.user.displayAvatarURL() });
                } else {
                    message.deferUpdate();

                    player.resume();

                    button.components[0].setEmoji(playerEmoji.pause).setStyle(ButtonStyle.Secondary);
                    trackMsg.setAuthor({ name: "Now Playing", iconURL: client.user.displayAvatarURL() });
                }

                await nplaying.edit({ embeds: [trackMsg], components: [button, button2] });
                break;
            case "prev":
                if (!player.queue.previous.length) {
                    embed.setDescription(`Previous song not found.`);

                    return message.reply({ embeds: [embed], ephemeral: true });
                }

                message.deferUpdate();

                player.previous();
                break;
            case "skip":
                if (player.queue.isEmpty && !client.data.get("autoplay", player.guildId)) {
                    embed.setDescription(`Queue is empty. Skip not possible.`);

                    return message.reply({ embeds: [embed], ephemeral: true });
                }

                message.deferUpdate();

                player.skip();
                break;
            case "loop":
                switch (player.loop) {
                    case "none":
                        embed.setDescription(`Loop mode has been set to \`song\`.`);

                        player.setLoop("song");
                        break;
                    case "song":
                        embed.setDescription(`Loop mode has been set to \`queue\`.`);

                        player.setLoop("queue");
                        break;
                    case "queue":
                        embed.setDescription(`Loop mode has been set to \`off\`.`);

                        player.setLoop("none");
                        break;
                }

                return message.reply({ embeds: [embed], ephemeral: true });
            case "shuffle":
                if (player.queue.isEmpty) {
                    embed.setDescription(`Queue is empty. Shuffle not possible.`);

                    return message.reply({ embeds: [embed], ephemeral: true });
                }

                player.queue.shuffle();

                embed.setDescription(`Queue has been shuffled.`);

                return message.reply({ embeds: [embed], ephemeral: true });
            case "voldown":
                if (player.volume <= client.config.minVolume) {
                    embed.setDescription(`Volume cannot be set below \`${client.config.minVolume}%\`.`);

                    return message.reply({ embeds: [embed], ephemeral: true });
                }

                const volumeDown = player.volume - 10;

                player.setVolume(volumeDown);

                embed.setDescription(`Volume has been set to \`${volumeDown}%\`.`);

                return message.reply({ embeds: [embed], ephemeral: true });
            case "volup":
                if (player.volume >= client.config.maxVolume) {
                    embed.setDescription(`Volume cannot be set above \`${client.config.maxVolume}%\`.`);

                    return message.reply({ embeds: [embed], ephemeral: true });
                }

                const volumeUp = player.volume + 10;

                player.setVolume(volumeUp);

                embed.setDescription(`Volume has been set to \`${volumeUp}%\`.`);

                return message.reply({ embeds: [embed], ephemeral: true });
            case "stop":
                message.deferUpdate();

                player.stop();
                break;
        }
    });
};

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
