const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType, MessageFlags } = require("discord.js");
const { createDataGuild, createDataUser } = require("../../../functions/createData.js");
const { permissions } = require("../../../functions/getPermission.js");

module.exports = async (client, interaction) => {
    if (!interaction.guild || interaction.user.bot) return;

    await createDataGuild(client, interaction.guild);
    await createDataUser(client, interaction.user);

    const userData = client.data.get(`userData_${interaction.user.id}`);
    const embed = new EmbedBuilder().setColor(client.config.embedColor);
    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder().setLabel("Support Server").setURL(client.config.supportServerUrl).setStyle(ButtonStyle.Link),
    );

    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = client.slash.get(interaction.commandName);
        if (!command) return;

        console.log(
            `[Slash] [${command.name}] | (${interaction.user.username})[${interaction.user.id}] | ${interaction.guild.name} [${interaction.guildId}]`,
        );

        const botPermissions = ["ViewChannel", "SendMessages", "EmbedLinks", "ReadMessageHistory"];
        const botMissingPermissions = [];

        for (const perm of botPermissions) {
            if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(perm)) botMissingPermissions.push(perm);
        }

        if (botMissingPermissions.length > 0) {
            const content = `The bot doesn't have one of these permissions \`${botMissingPermissions.join(", ")}\`.\nPlease double check them in your server role & channel settings.`;

            return interaction.reply({ content: content, components: [row], flags: [MessageFlags.Ephemeral] });
        }

        if (userData && userData.ban.status) {
            embed.setDescription(`You have been banned from using the bot.\n\`\`\`${userData.ban.reason}\`\`\``);

            return interaction.reply({ embeds: [embed], components: [row], flags: [MessageFlags.Ephemeral] });
        }

        const maintenance = client.data.get("maintenance");

        if (maintenance && !client.config.dev.includes(interaction.user.id)) {
            embed.setDescription(`The bot is currently under maintenance. Please try again later.`);

            return interaction.reply({ embeds: [embed], components: [row], flags: [MessageFlags.Ephemeral] });
        }

        let player = client.rainlink.players.get(interaction.guildId);

        return permissions(client, interaction, command, embed, player);
    }
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
