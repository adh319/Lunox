const { EmbedBuilder } = require("discord.js");
const User = require("../../../settings/models/User.js");

module.exports = {
    name: "delete",
    description: "Delete user premium.",
    category: "Premium",
    aliases: ["premiumdelete"],
    owner: true,
    run: async (client, message) => {
        const mention = message.mentions.members.first();

        if (!mention) {
            const embed = new EmbedBuilder().setDescription(`\`❌\` | Please mention user first.`).setColor(client.color);

            return message.reply({ embeds: [embed] });
        }

        const data = await User.findOne({ Id: mention.id });

        if (data.isPremium) {
            data.isPremium = false;
            data.premium.redeemedBy = [];
            data.premium.redeemedAt = null;
            data.premium.expiresAt = null;
            data.premium.plan = null;

            const newUser = await data.save({ new: true }).catch(() => {});
            client.premium.set(newUser.Id, newUser);

            const embed = new EmbedBuilder()
                .setDescription(`\`☑️\` | You've successfully remove ${mention} premium status.`)
                .setColor(client.color);

            return message.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setDescription(`\`❌\` | ${mention} premium status already removed or not a premium user.`)
                .setColor(client.color);

            return message.reply({ embeds: [embed] });
        }
    },
};
