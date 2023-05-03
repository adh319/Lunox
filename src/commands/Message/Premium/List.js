const { EmbedBuilder } = require("discord.js");
const User = require("../../../settings/models/User.js");
const moment = require("moment");

module.exports = {
    name: "list",
    description: "Get list of all premium user.",
    category: "Premium",
    aliases: ["premiumlist"],
    owner: true,
    run: async (client, message) => {
        const users = await User.find();

        let usersData = users.filter((user) => user.isPremium === true);
        let premium = usersData.map(
            (x, index) =>
                `\`\`\`${index + 1}. ${x.Id} | Plan: ${x.premium.plan} | Expire At: ${moment(x.premium.expiresAt).format(
                    "dddd, MMMM Do YYYY",
                )}\`\`\``,
        );

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${client.user.username} Premium List`, iconURL: client.user.avatarURL({ dynamic: true }) })
            .setColor(client.color)
            .setDescription(premium.join("\n") || "```No Premium User Found```");

        return message.reply({ embeds: [embed] });
    },
};
