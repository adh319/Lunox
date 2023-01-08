// Define the User from our Database Schema
const User = require("../settings/models/User");
const cron = require("node-cron");

// set the schedule, find the user in the database.
module.exports = async (client) => {
  cron.schedule("*/60 * * * * *", async () => {
    await User.find({ isPremium: true }, async (err, users) => {
      if (users && users.length) {
        // Set the expire Date and Time for our User + Code
        for (let user of users) {
          if (Date.now() >= user.premium.expiresAt) {
            // Default: The user is not a premium User
            user.isPremium = false;
            user.premium.redeemedBy = [];
            user.premium.redeemedAt = null;
            user.premium.expiresAt = null;
            user.premium.plan = null;

            // Save the updated user within the usersSettings.
            const newUser = await user.save({ new: true }).catch(() => {});
            client.usersSettings.set(newUser.Id, newUser);
          }
        }
      }
    });
  });
};
