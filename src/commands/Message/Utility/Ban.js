const { EmbedBuilder } = require("discord.js");
const Ban = require("../../../settings/models/Ban.js");

module.exports = {
    name: "ban",
    description: "Ban a user from using the bot.",
    category: "Utility",
    aliases: ["banuser"],
    owner: true,
    run: async (client, message, args) => {
        let id = args[0];
        let type = args[1];

        if (!id) return message.reply({ content: "`❌` | Please provide a user ID." });

        let REGEX = new RegExp(/^[0-9]+$/);

        if (!REGEX.test(id)) {
            const embed = new EmbedBuilder().setDescription(`\`❌\` | The ID must be a number.`).setColor(client.color);

            return message.reply({ embeds: [embed] });
        }

        if (!type) return message.reply({ content: "`❌` | Please provide a type. `enable` or `disable`." });

        let typeMode = ["enable", "disable"];

        if (!typeMode.includes(type)) return message.reply({ content: "`❌` | Please provide a valid type. `enable` or `disable`." });

        const user = await Ban.findOne({ userID: id });

        if (!user) {
            const embed = new EmbedBuilder().setDescription(`\`❌\` | \`${id}\` is not in my database.`).setColor(client.color);

            return message.reply({ embeds: [embed] });
        }

        if (type === "enable") {
            if (user.isBanned === true) {
                const embed = new EmbedBuilder().setDescription(`\`❌\` | \`${id}\` is already banned.`).setColor(client.color);

                return message.reply({ embeds: [embed] });
            } else {
                user.isBanned = true;
                user.bannedBy = message.author.id;
                user.bannedAt = Date.now();

                await user.save();

                const embed = new EmbedBuilder().setDescription(`\`☑️\` | You've successfully banned \`${id}\`.`).setColor(client.color);

                return message.reply({ embeds: [embed] });
            }
        } else if (type === "disable") {
            if (user.isBanned === false) {
                const embed = new EmbedBuilder().setDescription(`\`❌\` | \`${id}\` is not banned.`).setColor(client.color);

                return message.reply({ embeds: [embed] });
            } else {
                user.isBanned = false;
                user.bannedBy = null;
                user.bannedAt = null;

                await user.save();

                const embed = new EmbedBuilder().setDescription(`\`☑️\` | You've successfully unbanned \`${id}\`.`).setColor(client.color);

                return message.reply({ embeds: [embed] });
            }
        }
    },
};
