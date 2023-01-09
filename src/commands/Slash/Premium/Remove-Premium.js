const { ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");
const schema = require("../../../settings/models/Code.js");
const User = require("../../../settings/models/User.js");

module.exports = {
    name: "remove-premium",
    description: "remove preium from user",
    category: "Premium",
    options: [
        {
            name: "user",
            description: "mention a premium user",
            type: ApplicationCommandOptionType.User,
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

        let user = interaction.options.getUser("user");
        let data = client.userSettings.get(user.id);
        if (!data.isPremium) {
            return interaction.editReply(`${user} is Not a Premium User`);
        } else {
            await User.findOneAndRemove({ Id: user.id });
            await client.userSettings.delete(user.id);
            interaction.editReply(`${user} Removed From Premium`);
        }
    },
};
