const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
    createPage: async (client, response, embed, pages) => {
        let page = 0;

        const updateEmbed = (pageIndex) => {
            embed.setDescription(pages[pageIndex] || "No data found.");
        };

        updateEmbed(page);

        if (pages.length <= 1) {
            return response.editReply({ embeds: [embed] });
        } else {
            const pageEmoji = client.emoji.page;
            const buttons = {
                first: new ButtonBuilder().setCustomId("first").setEmoji(pageEmoji.first).setStyle(ButtonStyle.Secondary),
                back: new ButtonBuilder().setCustomId("back").setEmoji(pageEmoji.back).setStyle(ButtonStyle.Secondary),
                close: new ButtonBuilder().setCustomId("close").setEmoji(pageEmoji.close).setStyle(ButtonStyle.Danger),
                next: new ButtonBuilder().setCustomId("next").setEmoji(pageEmoji.next).setStyle(ButtonStyle.Secondary),
                last: new ButtonBuilder().setCustomId("last").setEmoji(pageEmoji.last).setStyle(ButtonStyle.Secondary),
            };
            const row = new ActionRowBuilder().addComponents(Object.values(buttons));
            const msg = await response.editReply({ embeds: [embed], components: [row] });
            const collector = msg.createMessageComponentCollector({ time: 60000 });

            collector.on("collect", async (button) => {
                // Prevent other users from interacting with the button
                if (button.user.id !== response.user.id) {
                    const embedDenied = new EmbedBuilder()
                        .setColor(client.config.embedColor)
                        .setDescription(`You are not allowed to use this button.`);

                    return button.editReply({ embeds: [embedDenied], ephemeral: true });
                }

                button.deferUpdate();

                switch (button.customId) {
                    case "first":
                        page = 0;
                        break;
                    case "back":
                        page = page > 0 ? page - 1 : 0;
                        break;
                    case "close":
                        if (msg) await msg.edit({ embeds: [embed], components: [] });

                        return collector.stop();
                    case "next":
                        page = page + 1 < pages.length ? page + 1 : pages.length - 1;
                        break;
                    case "last":
                        page = pages.length - 1;
                        break;
                }

                updateEmbed(page);

                if (msg) await msg.edit({ embeds: [embed], components: [row] });
            });

            collector.on("end", async () => {
                if (msg) await msg.edit({ embeds: [embed], components: [] });
            });
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
