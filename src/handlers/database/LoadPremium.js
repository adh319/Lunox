const User = require("../../settings/models/User");
const cron = require("node-cron");

module.exports = async (client) => {
    cron.schedule("*/60 * * * * *", async () => {
        const users = await User.find({ isPremium: true });

        if (!users || !users.length) return;

        await users.forEach(async (user) => {
            if (Date.now() >= user.premium.expiresAt) {
                user.isPremium = false;
                user.premium.redeemedBy = [];
                user.premium.redeemedAt = null;
                user.premium.expiresAt = null;
                user.premium.plan = null;

                const newUser = await user.save();

                client.premium.set(user.Id, newUser);

                console.log(`[DEBUG] Premium Expired for (${user.Id})`);
            }
        });
    });
};
