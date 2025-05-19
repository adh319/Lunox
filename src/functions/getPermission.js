const { PermissionsBitField, MessageFlags } = require("discord.js");

module.exports = {
    permissions: async (client, response, command, embed, player, args) => {
        if (command.permissions.bot) {
            if (!response.guild.members.me.permissions.has(command.permissions.bot || [])) {
                embed.setDescription(`The bot doesn't have permission \`${command.permissions.bot.join(", ")}\` to execute this command.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }
        }

        if (command.permissions.user) {
            if (!response.member.permissions.has(command.permissions.user || [])) {
                embed.setDescription(`You don't have permission \`${command.permissions.user.join(", ")}\` to execute this command.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }
        }

        if (command.settings.voice) {
            if (!response.member.voice.channel) {
                embed.setDescription(`You need to join a voice channel first.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }

            if (
                !response.guild.members.me.permissions.has(PermissionsBitField.Flags.Connect) ||
                !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.Connect)
            ) {
                embed.setDescription(`The bot doesn't have permission \`Connect\` in your voice channel.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }

            if (
                !response.guild.members.me.permissions.has(PermissionsBitField.Flags.Speak) ||
                !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.Speak)
            ) {
                embed.setDescription(`The bot doesn't have permission \`Speak\` in your voice channel.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }

            if (response.member.voice.channel.type === 13) {
                if (
                    !response.guild.members.me.permissions.has(PermissionsBitField.Flags.RequestToSpeak) ||
                    !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.RequestToSpeak)
                ) {
                    embed.setDescription(`The bot doesn't have permission \`Request To Speak\` in your stage channel.`);

                    return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
                }

                if (
                    !response.guild.members.me.permissions.has(PermissionsBitField.Flags.PrioritySpeaker) ||
                    !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.PrioritySpeaker)
                ) {
                    embed.setDescription(`The bot doesn't have permission \`Priority Speaker\` in your stage channel.`);

                    return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
                }
            }
        }

        if (command.settings.player) {
            if (!player) {
                embed.setDescription(`There is no player in this server.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }

            if (player.voiceId !== response.member.voice.channelId) {
                embed.setDescription(`You need to join the same voice channel as the bot.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }
        }

        if (command.settings.current) {
            if (!player.queue.current) {
                embed.setDescription(`There is no song currently playing in this server.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }
        }

        if (command.devOnly) {
            if (!client.config.dev.includes(response.member.id) || client.config.owner !== response.member.id) {
                embed.setDescription(`This command only available for developers.`);

                return response.reply({ embeds: [embed], flags: [MessageFlags.Ephemeral] });
            }
        }

        try {
            command.run(client, response, player, args);
        } catch (error) {
            console.error(error);
        }
    },
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
