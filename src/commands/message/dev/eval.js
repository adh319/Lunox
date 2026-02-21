const { EmbedBuilder } = require("discord.js");
const { inspect } = require("node:util");

module.exports = {
    name: "eval",
    aliases: ["ev"],
    description: "Evaluate JavaScript code",
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

        if (!args.length) {
            embed.setDescription("Please provide code to evaluate.");

            return message.reply({ embeds: [embed] });
        }

        const code = args.join(" ");

        const sanitize = (str) => {
            const sensitives = [process.env.TOKEN, process.env.MONGO_URI].filter(Boolean);
            for (const secret of sensitives) {
                str = str.replaceAll(secret, "[REDACTED]");
            }
            return str;
        };

        try {
            let result = eval(code);

            if (result instanceof Promise) result = await result;

            let output = sanitize(inspect(result, { depth: 2 }));

            if (output.length > 1900) output = output.slice(0, 1900) + "\n... (truncated)";

            embed.setTitle("✅ Eval Result").setDescription(`\`\`\`js\n${output}\n\`\`\``);
        } catch (error) {
            let output = sanitize(String(error));

            if (output.length > 1900) output = output.slice(0, 1900) + "\n... (truncated)";

            embed.setTitle("❌ Eval Error").setDescription(`\`\`\`js\n${output}\n\`\`\``);
        }

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
