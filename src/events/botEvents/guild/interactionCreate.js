const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType } = require("discord.js");
const { supportUrl } = require("../../../settings/config.js");
const User = require("../../../settings/models/User.js");

module.exports.run = async (client, interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    const msg_cmd = [
      `[COMMAND] ${command.name}`,
      `used by ${interaction.user.tag} from ${interaction.guild.name} (${interaction.guild.id})`,
    ];

    console.log(`${msg_cmd.join(" ")}`);

    const warning = new EmbedBuilder().setColor(client.color).setTimestamp();
    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Support").setURL(supportUrl).setStyle(ButtonStyle.Link));

    //Default Permission
    const botPermissions = ["ViewChannel", "SendMessages", "ManageMessages", "EmbedLinks"];
    const botMissingPermissions = [];

    for (const perm of botPermissions) {
      if (!interaction.channel.permissionsFor(interaction.guild.members.me).has(perm)) {
        botMissingPermissions.push(perm);
      }
    }

    if (botMissingPermissions.length > 0) {
      return interaction.reply({
        content: `\`❌\` | I don't have one of these permissions \`ViewChannel\`, \`SendMessages\`, \`ManageMessages\`, \`EmbedLinks\`.\nPlease double check them in your server role & channel settings.`,
        components: [row],
        ephemeral: true,
      });
    }

    //Check Bot Command Permissions
    if (!interaction.guild.members.cache.get(client.user.id).permissions.has(command.permissions.bot || [])) {
      await warning.setDescription(`\`❌\` | I don't have permission \`${command.permissions.bot.join(", ")}\` to execute this command.`);

      return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
    }

    //Check User Permissions
    if (!interaction.member.permissions.has(command.permissions.user || [])) {
      await warning.setDescription(
        `\`❌\` | You don't have permission \`${command.permissions.user.join(", ")}\` to execute this command.`
      );

      return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
    }

    // Check In Voice & Same Voice Channel
    const { channel } = interaction.member.voice;
    //In Voice Channel Check
    if (command.settings.inVc) {
      if (!channel) {
        await warning.setDescription(`\`❌\` | You must be in a voice channel to use this command.`);

        return interaction.reply({ embeds: [warning], ephemeral: true });
      }

      if (
        !interaction.guild.members.cache
          .get(client.user.id)
          .permissionsIn(channel)
          .has(command.permissions.channel || [])
      ) {
        await warning.setDescription(
          `\`❌\` | I don't have permission \`${command.permissions.channel.join(", ")}\` to execute this command in this channel.`
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

      if (
        !interaction.guild.members.cache
          .get(client.user.id)
          .permissionsIn(channel)
          .has(command.permissions.channel || [])
      ) {
        await warning.setDescription(
          `\`❌\` | I don't have permission \`${command.permissions.channel.join(", ")}\` to execute this command in this channel.`
        );

        return interaction.reply({ embeds: [warning], components: [row], ephemeral: true });
      }
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

    //Check Owner
    if (command.settings.owner && interaction.user.id !== client.owner) {
      await warning.setDescription(`\`❌\` | Only my owner can use this command!`);

      return interaction.reply({ embeds: [warning], ephemeral: true });
    }

    // Premium Check
    let user = client.userSettings.get(interaction.user.id);
  // If there is no user, create it in the Database as "newUser"
  if (!user) {
    const findUser = await User.findOne({ Id: interaction.user.id });
    if (!findUser) {
      const newUser = await User.create({ Id: interaction.user.id });
      client.userSettings.set(interaction.user.id, newUser);
      user = newUser;
    } else return;
  }

  if (command.settings.premium && user && !user.isPremium) {
     await warning.setDescription(`\`❌\` | You're not premium user!`);
    interaction.reply({ embeds: [warning], ephemeral: true });
  }
  

    //Error handling
    try {
      command.run(client, interaction, player);
    } catch (error) {
      console.log(error);

      await warning.setDescription(`\`❌\` | Something went wrong.`);

      return interaction.editReply({ embeds: [warning], components: [row], ephmeral: true });
    }
  }
};
