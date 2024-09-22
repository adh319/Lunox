const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "Get a list of commands",
    category: "general",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const categories = readdirSync("./src/commands/interaction/");

        const categoryPromises = categories.map(async (category) => {
            const commands = client.slash.filter((c) => c.category === category);

            const slashCommandData = await Promise.all(
                commands.map(async (c) => {
                    return `\`${c.name}\``;
                }),
            );

            const categoryNames = { general: "General", music: "Music", setting: "Settings" };
            const categoryName = categoryNames[category] || null;

            return embed.addFields({ name: `\`❯\`  ${toOppositeCase(categoryName)}`, value: `${slashCommandData.join(", ")}` });
        });

        await Promise.all(categoryPromises);

        embed
            .setAuthor({ name: `${client.user.username}'s Help`, iconURL: client.user.displayAvatarURL() })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(
                `Hello **${interaction.member}**, I'm **${client.user}**. A Rich Quality Discord Music Bot. Support  Spotify, SoundCloud, Apple Music & Others. Find out what I can do using commands below:`,
            )
            .setFooter({
                text: `© ${client.user.username} | Total Commands: ${client.slash.size}`,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Support Server").setURL(client.config.supportServerUrl).setStyle(ButtonStyle.Link),
        );

        return interaction.reply({ embeds: [embed], components: [row] });
    },
};

function toOppositeCase(char) {
    return char.charAt(0).toUpperCase() + char.slice(1).toLowerCase();
}

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
