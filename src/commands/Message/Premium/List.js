const { EmbedBuilder } = require("discord.js");
const moment = require("moment");

module.exports = {
    name: "list",
    description: "Get list of all premium user.",
    category: "Premium",
    aliases: ["premiumlist"],
    owner: true,
    run: async (client, message) => {
        let data = client.premium
            .filter((data) => data.isPremium === true)
            .map((data, index) => {
                return `${index + 1} <@${data.Id}> Expire At :- \`${moment(data.premium.expiresAt).format(
                    "dddd, MMMM Do YYYY"
                )}\` Plan :- \`${data.premium.plan}\` `;
            });

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Premium User List.`, iconUrl: client.user.displayAvatarURL({ dynamic: true }) })
            .setColor(client.color)
            .setDescription(data.join("\n") || "No Premium User Found");

        return message.reply({ embeds: [embed] });
    },
};
