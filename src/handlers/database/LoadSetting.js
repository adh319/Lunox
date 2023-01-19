const User = require("../../settings/models/User.js");

module.exports = async (client) => {
    client.createInteraction = async function (interaction) {
        const find_premium = await User.findOne({ Id: interaction.user.id });

        if (!find_premium) {
            const newPremium = await User.create({ Id: interaction.user.id });

            await newPremium.save();

            interaction.client.premium.set(interaction.user.id, newPremium);
        }
    };

    client.createMessage = async function (message) {
        const find_premium = await User.findOne({ Id: message.author.id });

        if (!find_premium) {
            const newPremium = await User.create({ Id: message.author.id });

            await newPremium.save();

            message.client.premium.set(message.author.id, newPremium);
        }
    };
};
