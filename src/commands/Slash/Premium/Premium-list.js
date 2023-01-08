const User = require("../../../settings/models/User.js");
const moment = require("moment");
const { Collection, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "premiumlist",
  description: "get list of all preimium use",
  category: "Premium",
  permissions: {
    bot: [],
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

    let data = client.userSettings
      .filter((data) => data.isPremium === true)
      .map((data, index) => {
        return ` <@${data.Id}> Expire At :- \`${moment(
          data.premium.expiresAt
        ).format("dddd, MMMM Do YYYY")}\` Plan :- \`${data.premium.plan}\` `;
      });
    interaction.editReply({
      embeds: [
        new EmbedBuilder().setDescription(
          data.join("\n") || "No Premium User Found"
        ),
      ],
    });
  },
};
