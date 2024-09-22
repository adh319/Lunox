const cron = require("node-cron");

module.exports = async (client) => {
    const updateSettings = async (items, settingMap, dataModel, type) => {
        for (const item of items) {
            const setting = settingMap.get(`${type}_${item.id}`);

            await dataModel.findOneAndUpdate({ id: item.id }, { $set: setting }, { upsert: true, new: true });
        }
    };

    cron.schedule("*/600 * * * * *", async () => {
        try {
            const guilds = await client.guildData.find();
            await updateSettings(guilds, client.data, client.guildData, "guildData");

            const users = await client.userData.find();
            await updateSettings(users, client.data, client.userData, "userData");
        } catch (error) {
            console.error("An error occurred while updating the database:", error);
        }
    });
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
