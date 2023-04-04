const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "devmode",
    description: "Set dev or maintenance mode.",
    category: "Owner",
    aliases: ["maintenance", "dev"],
    owner: true,
    run: async (client, message, args) => {
        const value = args[0];
        const mode = ["enable", "disable"];

        if (!value) return message.reply({ content: `\`❌\` | You didn't provide any dev mode: \`${mode.join(", ")}\`` });

        if (!mode.includes(args[0]))
            return message.reply({ content: `\`❌\` | You didn't provide any valid dev mode: \`${mode.join(", ")}\`` });

        const enable = true;

        const embed = new EmbedBuilder().setColor(client.color).setTimestamp();

        if (value === "enable") {
            if (client.dev.has(enable)) {
                embed.setDescription(`\`❌\` | Dev mode is already: \`Enabled\``);

                return message.reply({ embeds: [embed] });
            }

            await client.dev.add(enable);

            embed.setDescription(`\`☑️\` | Dev mode has been: \`Enabled\``);

            return message.reply({ embeds: [embed] });
        }

        if (value === "disable") {
            if (!client.dev.has(enable)) {
                embed.setDescription(`\`❌\` | Dev mode is already: \`Disabled\``);

                return message.reply({ embeds: [embed] });
            }

            await client.dev.delete(enable);

            embed.setDescription(`\`☑️\` | Dev mode has been: \`Disabled\``);

            return message.reply({ embeds: [embed] });
        }
    },
};
