const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, InteractionType } = require("discord.js");
const { supportUrl } = require("../../../settings/config.js");

module.exports.run = async (client, interaction) => {
  if (interaction.type === InteractionType.ApplicationCommand) {
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    const msg_cmd = [
      `[COMMAND] ${command.name}`,
      `used by ${interaction.user.tag} from ${interaction.guild.name} (${interaction.guild.id})`,
    ];

    console.log(`${msg_cmd.join(" ")}`);

    const player = client.poru.players.get(interaction.guild.id);
    const memberChannel = interaction.member.voice.channelId;
    const botChannel = interaction.guild.members.me.voice.channelId;

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
      await warning.setDescription(
        `\`❌\` | I don't have one of these permissions \`ViewChannel\`, \`SendMessages\`, \`ManageMessages\`, \`EmbedLinks\`.\nPlease double check them in your server role & channel settings.`
      );

      return interaction.reply({ embed: [warning], components: [row], ephemeral: true });
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

    //Voice Channel only
    if (command.settings.inVc && !memberChannel) {
      await warning.setDescription(`\`❌\` | You must be in a Voice channel to use this command.`);

      return interaction.reply({ embeds: [warning], ephemeral: true });
    }

    //Same Voice Channel only
    if (command.settings.sameVc && player && botChannel !== memberChannel) {
      await warning.setDescription(`\`❌\` | You must be in the same Voice channel as mine to use this command.`);

      return interaction.reply({ embeds: [warning], ephemeral: true });
    }

    //Player check
    if (command.settings.player && !player) {
      await warning.setDescription(`\`❌\` | No player exists for this server.`);

      return interaction.reply({ embeds: [warning], ephemeral: true });
    }

    //Current Player Check
    if (command.settings.current && !player.currentTrack) {
      await warning.setDescription(`\`❌\` | There is nothing playing right now.`);

      return interaction.reply({ embeds: [warning], ephemeral: true });
    }

    //Check Owner Only
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
