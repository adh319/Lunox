const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports = async (client, oldState, newState) => {
    if (newState.channelId && newState.channel.type == 13 && newState.guild.members.me.voice.suppress) {
        if (
            newState.guild.members.me.permissions.has(PermissionsBitField.Flags.Speak) ||
            newState.channel.permissionsFor(newState.guild.members.me).has(PermissionsBitField.Flags.Speak)
        ) {
            newState.guild.members.me.voice.setSuppressed(false);
        }
    }

    const newStatePlayer = client.rainlink.players.get(newState.guildId);

    if (newStatePlayer && newState.channelId == null && newState.member?.user.id === client.user?.id) {
        newStatePlayer.state !== 2 ? newStatePlayer.destroy() : true;
    }

    const guildData = client.data.get(`guildData_${newState.guildId || oldState.guildId}`);

    if (guildData && guildData.reconnect.status) return;

    const oldStatePlayer = client.rainlink.players.get(oldState.guildId || newState.guildId);

    if (!oldStatePlayer) return;

    const isBotAlone =
        oldState.guild.members.me.voice?.channel && oldState.guild.members.me.voice.channel.members.filter((m) => !m.user.bot).size === 0;

    const isNotPlaying = !oldStatePlayer.playing && !oldStatePlayer.queue.current;

    if (oldStatePlayer.voiceId || oldState.guild.members.me.voice.channelId === oldState.channelId) {
        if (isBotAlone || isNotPlaying) {
            await delay(client.config.leaveTimeout);

            const vcMembers = oldState.guild.members.me.voice.channel?.members.size;
            const leaveEmbed = await client.channels.cache.get(oldStatePlayer.textId);
            const stillBotAlone = oldState.guild.members.me.voice.channel?.members.filter((m) => !m.user.bot).size === 0;
            const stillNotPlaying = !oldStatePlayer.playing && !oldStatePlayer.queue.current;

            if ((stillBotAlone || stillNotPlaying) && (!vcMembers || vcMembers === 1 || vcMembers > 1)) {
                if (oldStatePlayer.message) await oldStatePlayer.message.delete().catch((e) => {});

                oldStatePlayer.destroy().catch((e) => {});

                const timeoutEmbed = new EmbedBuilder()
                    .setColor(client.config.embedColor)
                    .setDescription(
                        `Disconnecting from the voice channel due to inactivity. You can disable this by using \`247\` command.`,
                    );

                return leaveEmbed.send({ embeds: [timeoutEmbed] }).then((msg) => {
                    if (!msg) return;

                    setTimeout(() => {
                        msg.delete().catch(() => {});
                    }, 10000);
                });
            }
        }
    }
};

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
