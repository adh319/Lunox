const Logger = require("../utils/logger");

module.exports = {
    createDataGuild: async (client, guild) => {
        try {
            const guildData = await client.guildData.findOneAndUpdate(
                { id: guild.id },
                { $setOnInsert: { id: guild.id } },
                { upsert: true, returnDocument: "after" },
            );
            const { _id, __v, ...data } = guildData.toObject();

            if (!client.data.has(`guildData_${guild.id}`)) client.data.set(`guildData_${guild.id}`, data);
        } catch (error) {
            Logger.error("Error creating guild data:", error);
        }
    },

    createDataUser: async (client, user) => {
        if (user.bot || user.id === client.user.id) return;

        try {
            const userData = await client.userData.findOneAndUpdate(
                { id: user.id },
                { $setOnInsert: { id: user.id } },
                { upsert: true, returnDocument: "after" },
            );
            const { _id, __v, ...data } = userData.toObject();

            if (!client.data.has(`userData_${user.id}`)) client.data.set(`userData_${user.id}`, data);
        } catch (error) {
            Logger.error("Error creating user data:", error);
        }
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
