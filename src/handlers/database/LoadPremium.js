const User = require("../../settings/models/User");
const cron = require("node-cron");

module.exports = async (client) => {
    cron.schedule("*/60 * * * * *", async () => {
        await User.find({ isPremium: true }, async (err, users) => {
            if (users && users.length) {
                for (let user of users) {
                    if (Date.now() >= user.premium.expiresAt) {
                        user.isPremium = false;
                        user.premium.redeemedBy = [];
                        user.premium.redeemedAt = null;
                        user.premium.expiresAt = null;
                        user.premium.plan = null;

                        const newUser = await user.save({ new: true }).catch(() => {});

                        client.premium.set(newUser.Id, newUser);
                    }
                }
            }
        });
    });
};
