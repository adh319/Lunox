const Ban = require("../../settings/models/Ban.js");

module.exports = async (client) => {
    client.createInteraction = async function (interaction) {
        const find_ban = await Ban.findOne({ userID: interaction.user.id });

        if (!find_ban) {
            const newBan = await Ban.create({ userID: interaction.user.id });

            await newBan.save();
        }
    };

    client.createMessage = async function (message) {
        const find_ban = await Ban.findOne({ userID: message.author.id });

        if (!find_ban) {
            const newBan = await Ban.create({ userID: message.author.id });

            await newBan.save();
        }
    };
};
