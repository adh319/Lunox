const { ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");
const voucher_codes = require("voucher-code-generator");
const schema = require("../../../settings/models/Code.js");

module.exports = {
  // options
  name: "gencode",
  description: `gen premium codes`,
  
  category: "Premium",
  
  options: [
    {
      name: "plan",
      description: `choose your plan`,
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "daily",
          value: "daily",
        },
        {
          name: "weekly",
          value: "weekly",
        },
        {
          name: "monthly",
          value: "monthly",
        },
        {
          name: "yearly",
          value: "yearly",
        },
      ],
    },
    {
      name: "amount",
      description: `amount of codes`,
      type: ApplicationCommandOptionType.Number,
      required: false,
    },
  ],

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
  },

  // command start
  run: async (client, interaction) => {
    
    await interaction.deferReply({ ephemeral: true });
    
    let codes = [];

    // Display available plans of the code
    const plan = interaction.options.getString("plan");

    // Calculate time for the code to expire.
    let time;
    if (plan === "daily") time = Date.now() + 86400000;
    if (plan === "weekly") time = Date.now() + 86400000 * 7;
    if (plan === "monthly") time = Date.now() + 86400000 * 30;
    if (plan === "yearly") time = Date.now() + 86400000 * 365;

    // If the input is for ex. 10, generate 10 Codes. Default => 1 Code / Command.
    let amount = interaction.options.getNumber("amount");
    if (!amount) amount = 1;

    for (var i = 0; i < amount; i++) {
      const codePremium = voucher_codes.generate({
        pattern: "####-####-####",
      });

      // Save the Code as a String ("ABCDEF ...") in the Database
      const code = codePremium.toString().toUpperCase();

      // Security check, check if the code exists in the database.
      const find = await schema.findOne({
        code: code,
      });

      // If it does not exist, create it in the database.
      if (!find) {
        schema.create({
code: code,
          plan: plan,
          expiresAt: time,
        });

        
        codes.push(`${i + 1}- ${code}`);
      }
    }

    // Lastly, we want to send the new Code(s) into the Channel.
    interaction.editReply({
      content: `\`\`\`Generated +${codes.length}\n\n--------\n${codes.join(
        "\n"
      )}\n--------\n\nType - ${plan}\nExpires - ${moment(time).format(
        "dddd, MMMM Do YYYY"
      )}\`\`\`\nTo redeem, use \`/redeem <code>\``,
    });
  },
};
