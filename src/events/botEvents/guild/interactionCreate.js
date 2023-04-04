const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType } = require("discord.js");
const { supportUrl } = require("../../../settings/config.js");

module.exports.run = async (client, interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = client.slashCommands.get(interaction.commandName);

        // Getting Premium User Database
        let user = client.premium.get(interaction.user.id);
        await client.createInteraction(interaction);

        if (!command) return;

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder().setLabel("Support").setURL(supportUrl).setStyle(ButtonStyle.Link),
        );

        if (client.dev.has(true) && interaction.user.id !== client.owner) {
            return interaction.reply({
                content: `\`❌\` | ${client.user} is under maintenance. Sorry for the inconvinience.\n\nThank You.`,
                components: [row],
                ephemeral: true,
            });
        }

        const msg_cmd = [
            `[COMMAND] ${command.name}`,
            `used by ${interaction.user.tag} from ${interaction.guild.name} (${interaction.guild.id})`,
        ];

        console.log(`${msg_cmd.join(" ")}`);

        //Default Permission
        const botPermissions = ["ViewChannel", "SendMessages", "EmbedLinks"];
        const botMissingPermissions = [];

        for (const perm of botPermissions) {
            if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(perm)) {
                botMissingPermissions.push(perm);
            }
        }

        if (botMissingPermissions.length > 0) {
            return interaction.reply({
                content: `\`❌\` | I don't have one of these permissions \`ViewChannel\`, \`SendMessages\`, \`EmbedLinks\`.\nPlease double check them in your server role & channel settings.`,
                components: [row],
                ephemeral: true,
            });
        }

        const warning = new EmbedBuilder().setColor(client.color).setTimestamp();

        //Check Bot Command Permissions
        if (!interaction.guild.members.cache.get(client.user.id).permissions.has(command.permissions.bot || [])) {
            await warning.setDescription(
                `\`❌\` | I don't have permission \`${command.permissions.bot.join(", ")}\` to execute this command.`,
            );

            return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
        }

        //Check User Permissions
        if (!interaction.member.permissions.has(command.permissions.user || [])) {
            await warning.setDescription(
                `\`❌\` | You don't have permission \`${command.permissions.user.join(", ")}\` to execute this command.`,
            );

            return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
        }

        // Check Player & Current Playing
        let player = client.poru.players.get(interaction.guild.id);
        //Player check
        if (command.settings.player && !player) {
            await warning.setDescription(`\`❌\` | There isn't player exists for this server.`);

            return interaction.reply({ embeds: [warning], ephemeral: true });
        }

        //Current Playing Check
        if (command.settings.current && !player.currentTrack) {
            await warning.setDescription(`\`❌\` | There isn't any current playing right now.`);

            return interaction.reply({ embeds: [warning], ephemeral: true });
        }

        // Check In Voice & Same Voice Channel
        const { channel } = interaction.member.voice;
        //In Voice Channel Check
        if (command.settings.inVc) {
            if (!channel) {
                await warning.setDescription(`\`❌\` | You must be in a voice channel to use this command.`);

                return interaction.reply({ embeds: [warning], ephemeral: true });
            }

            //Bot in Channel Check
            if (
                !interaction.guild.members.cache
                    .get(client.user.id)
                    .permissionsIn(channel)
                    .has(command.permissions.channel || [])
            ) {
                await warning.setDescription(
                    `\`❌\` | I don't have permission \`${command.permissions.channel.join(
                        ", ",
                    )}\` to execute this command in this channel.`,
                );

                return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
            }
        }

        //Same Voice Channel Check
        if (command.settings.sameVc) {
            if (!channel || interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId) {
                await warning.setDescription(`\`❌\` | You must be on the same voice channel as mine to use this command.`);

                return interaction.reply({ embeds: [warning], ephemeral: true });
            }

            //Bot in Channel Check
            if (
                !interaction.guild.members.cache
                    .get(client.user.id)
                    .permissionsIn(channel)
                    .has(command.permissions.channel || [])
            ) {
                await warning.setDescription(
                    `\`❌\` | I don't have permission \`${command.permissions.channel.join(
                        ", ",
                    )}\` to execute this command in this channel.`,
                );

                return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
            }
        }

        // Premium User Check
        if (command.settings.premium) {
            if (user && !user.isPremium) {
                await warning.setDescription(`\`❌\` | You're not premium user!`);

                return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
            }
        }

        //Check Owner
        if (command.settings.owner && interaction.user.id !== client.owner) {
            await warning.setDescription(`\`❌\` | Only my owner can use this command!`);

            return interaction.reply({ embeds: [warning], ephemeral: true });
        }

        //Error handling
        try {
            command.run(client, interaction);
        } catch (error) {
            console.log(error);

            await warning.setDescription(`\`❌\` | Something went wrong.`);

            return interaction.editReply({ embeds: [warning], components: [row], ephmeral: true });
        }
    }
};
