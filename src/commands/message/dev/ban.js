const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "ban",
    aliases: ["block"],
    description: "Ban a user",
    category: "dev",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: true,
    run: async (client, message, player, args) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const user = message.mentions.users.first() || client.users.cache.get(args[0]);
        const reason = args.slice(1).join(" ");

        if (!user) {
            embed.setDescription(`User not found. Please mention a user or provide a valid user ID.`);

            return message.reply({ embeds: [embed] });
        }

        let userData = client.data.get(`userData_${user.id}`);

        if (!userData) {
            const newUserData = await client.userData.findOneAndUpdate(
                { id: user.id },
                { $set: { ban: { status: true, reason: reason || "No reason provided" } } },
                { upsert: true, new: true },
            );
            const { _id, __v, ...data } = newUserData.toObject();

            client.data.set(`userData_${user.id}`, data);

            userData = client.data.get(`userData_${user.id}`);
        }

        if (userData.ban.status) {
            embed.setDescription(`User ${user.username} is already banned.`);

            return message.reply({ embeds: [embed] });
        }

        userData.ban = { status: true, reason: reason || "No reason provided" };

        embed.setDescription(`User ${user.username} has been banned.`).setFooter({ text: `Reason: ${reason || "No reason provided"}` });

        return message.reply({ embeds: [embed] });
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
