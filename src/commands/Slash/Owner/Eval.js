const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");
const { inspect } = require("util");

module.exports = {
    name: "eval",
    description: "Developer Command!",
    category: "Owner",
    options: [
        {
            name: "code",
            description: "Code to exeute.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: false,
        player: false,
        current: false,
        owner: true,
        premium: false,
    },

    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        const code = interaction.options.getString("code");

        try {
            const result = await eval(code);
            if (result === client.token) return;
            let output = result;
            if (typeof result !== "string") {
                output = inspect(result);
            }
            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Prompt:" })
                        .setDescription("```js\n" + output + "\n```")
                        .setColor(client.color),
                ],
            });
        } catch (e) {
            console.log(e);

            interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({ name: "Error!" })
                        .setDescription("An error occured! Check console...")
                        .setColor(client.color),
                ],
            });
        }
    },
};
