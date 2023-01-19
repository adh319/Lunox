const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");
const moment = require("moment");
const Code = require("../../../settings/models/Code.js");
const User = require("../../../settings/models/User.js");

module.exports = {
    name: "redeem",
    description: "Redeem your premium code.",
    category: "Premium",
    options: [
        {
            name: "code",
            description: "Provide valid code.",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: false,
        sameVc: false,
        player: false,
        current: false,
        owner: false,
        premium: false,
    },

    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        let member = await User.findOne({ Id: interaction.user.id });

        const input = interaction.options.getString("code");
        const premium = await Code.findOne({ code: input.toUpperCase() });

        if (member && member.isPremium) {
            const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | You already a premium user.`);

            return interaction.editReply({ embeds: [embed] });
        }

        if (premium) {
            const expires = moment(premium.expiresAt).format("dddd, MMMM Do YYYY HH:mm:ss");

            member.isPremium = true;
            member.premium.redeemedBy.push(interaction.user);
            member.premium.redeemedAt = Date.now();
            member.premium.expiresAt = premium.expiresAt;
            member.premium.plan = premium.plan;

            member = await member.save({ new: true });
            client.premium.set(interaction.user.id, member);
            await premium.deleteOne();

            const embed = new EmbedBuilder()
                .setAuthor({ name: `Premium Redeemed!`, iconURL: client.user.displayAvatarURL() })
                .setDescription(`Conratulations ${interaction.member}. You've successfully redeem premium code with the following details.`)
                .addFields([
                    { name: `\`👥\` • Redeemed By`, value: `\`\`\`${interaction.member.displayName}\`\`\``, inline: true },
                    { name: `\`💠\` • Plan Type`, value: `\`\`\`${premium.plan}\`\`\``, inline: true },
                    { name: `\`🕓\` • Expired Time`, value: `\`\`\`${expires}\`\`\``, inline: true },
                ])
                .setThumbnail(interaction.user.displayAvatarURL())
                .setColor(client.color)
                .setTimestamp();

            return interaction.editReply({ embeds: [embed] });
        } else {
            const embed = new EmbedBuilder()
                .setColor(client.color)
                .setDescription(`\`❌\` | The provided code was invalid, please use a valid one.`);

            return interaction.editReply({ embeds: [embed] });
        }
    },
};
