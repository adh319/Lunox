const User = require("../../settings/models/User.js");
const Guild = require("../../settings/models/Guild.js");

module.exports = async (client) => {
    client.createInteraction = async function (interaction) {
        const findGuild = await Guild.findOne({ Id: interaction.guild.id });

        if (!findGuild) {
            const newGuild = await Guild.create({ Id: interaction.guild.id });

            await newGuild.save();
        }

        const findUser = await User.findOne({ Id: interaction.user.id });

        if (!findUser) {
            const newUser = await User.create({ Id: interaction.user.id });

            await newUser.save();

            interaction.client.premium.set(interaction.user.id, newUser);
        }
    };

    client.createMessage = async function (message) {
        const findGuild = await Guild.findOne({ Id: message.guild.id });

        if (!findGuild) {
            const newGuild = await Guild.create({ Id: message.guild.id });

            await newGuild.save();
        }

        const findUser = await User.findOne({ Id: message.author.id });

        if (!findUser) {
            const newUser = await User.create({ Id: message.author.id });

            await newUser.save();

            message.client.premium.set(message.author.id, newUser);
        }
    };
};
