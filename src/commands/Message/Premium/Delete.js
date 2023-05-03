const { EmbedBuilder } = require("discord.js");
const User = require("../../../settings/models/User.js");

module.exports = {
    name: "delete",
    description: "Delete user premium.",
    category: "Premium",
    aliases: ["premiumdelete"],
    owner: true,
    run: async (client, message, args) => {
        let id = args[0];

        if (!id) return message.reply({ content: "`❌` | Please provide a user ID." });

        let REGEX = new RegExp(/^[0-9]+$/);

        if (!REGEX.test(id)) {
            const embed = new EmbedBuilder().setDescription(`\`❌\` | The ID must be a number.`).setColor(client.color);

            return message.reply({ embeds: [embed] });
        }

        const user = client.premium.get(id);

        if (!user) {
            const embed = new EmbedBuilder()
                .setDescription(`\`❌\` | \`${id}\` is not a premium user or not in my database.`)
                .setColor(client.color);

            return message.reply({ embeds: [embed] });
        }

        const userData = await User.findOne({ Id: id });

        if (userData.isPremium === true) {
            userData.isPremium = false;
            userData.premium.redeemedBy = [];
            userData.premium.redeemedAt = null;
            userData.premium.expiresAt = null;
            userData.premium.plan = null;

            const newUser = await userData.save();
            client.premium.set(userData.Id, newUser);

            const embed = new EmbedBuilder()
                .setDescription(`\`☑️\` | You've successfully remove \`${id}\` premium status.`)
                .setColor(client.color);

            return message.reply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setDescription(`\`❌\` | \`${id}\` premium status already removed or not a premium user.`)
                .setColor(client.color);

            return message.reply({ embeds: [embed] });
        }
    },
};
