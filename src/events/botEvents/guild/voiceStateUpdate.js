const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, EmbedBuilder } = require("discord.js");
const { supportUrl } = require("../../../settings/config.js");
const Reconnect = require("../../../settings/models/247.js");
const delay = require("delay");

module.exports.run = async (client, oldState, newState) => {
    const data = await Reconnect.findOne({ guild: newState.guild.id });

    const player = client.poru.players.get(newState.guild.id);
    if (!player) return;

    if (!newState.guild.members.cache.get(client.user.id).voice.channelId) player.destroy();

    if (newState.channelId && newState.channel.type == "GUILD_STAGE_VOICE" && newState.guild.members.me.voice.suppress) {
        if (
            newState.guild.members.me.permissions.has(PermissionsBitField.Flags.Connect) ||
            (newState.channel && newState.channel.permissionsFor(nS.guild.members.me).has(PermissionsBitField.Flags.Speak))
        ) {
            newState.guild.members.me.voice.setSuppressed(false);
        }
    }

    // this will make the bot will not be disconneted/destroyed when lefted alone in voice channel if 247 activated.
    if (data && Date.now() >= data.time) await data.delete(); // Enable this only When 247 command settings premium is set to true.
    if (data) return;
    //

    if (oldState.id === client.user.id) return;
    if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

    const vcRoom = oldState.guild.members.me.voice.channel.id;
    const leaveEmbed = client.channels.cache.get(player.textChannel);

    if (oldState.guild.members.cache.get(client.user.id).voice.channelId === oldState.channelId) {
        if (
            oldState.guild.members.me.voice?.channel &&
            oldState.guild.members.me.voice.channel.members.filter((m) => !m.user.bot).size === 0
        ) {
            await delay(client.config.leaveTimeout);

            const vcMembers = oldState.guild.members.me.voice.channel?.members.size;
            if (!vcMembers || vcMembers === 1) {
                if (!player) return;
                await player.destroy();

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder().setLabel("Support").setURL(supportUrl).setStyle(ButtonStyle.Link)
                );

                const TimeoutEmbed = new EmbedBuilder()
                    .setDescription(
                        `\`👋\` | Disconnected...!!! Because I was left alone in <#${vcRoom}>. This can be disable by using \`247\` command.`
                    )
                    .setColor(client.color);

                try {
                    if (leaveEmbed) leaveEmbed.send({ embeds: [TimeoutEmbed], components: [row] });
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
};
