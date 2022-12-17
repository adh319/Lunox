const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, message) => {
  //Ignoring bot, system, dm and webhook messages
  if (message.author.bot || !message.guild || message.system || message.webhookId) return;

  let prefix = client.prefix;
  const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

  if (message.content.match(mention)) {
    const embed = new EmbedBuilder().setColor(client.color).setDescription(`My prefix for this server is: \`/\``);

    message.reply({ embeds: [embed] });
  }

  //remove prefix for owner
  if (client.owner.includes(message.member.id) && !client.owner.includes(client.user.id) && !message.content.startsWith(prefix)) {
    prefix = "";
  }

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
  if (!prefixRegex.test(message.content)) return;
  const [matchedPrefix] = message.content.match(prefixRegex);
  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);

  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);

  //Finding command from aliases
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  const player = client.poru.players.get(message.guild.id);
  const memberChannel = message.member.voice.channelId;
  const botChannel = message.guild.members.me.voice.channelId;
  const user = client.premiums.get(message.author.id);
  const guild = client.gpremiums.get(message.guild.id);

  if (!command) return;

  console.log(
    `[COMMAND] - ${command.name} executed by ${message.author.tag} | ${client.user.username} in ${message.guild.name} (${message.guild.id})`
  );

  //Default Permission
  const botPermissions = ["ViewChannel", "SendMessages", "ManageMessages", "EmbedLinks"];
  const botMissingPermissions = [];

  for (const perm of botPermissions) {
    if (!message.channel.permissionsFor(message.guild.members.me).has(perm)) {
      botMissingPermissions.push(perm);
    }
  }
  if (botMissingPermissions.length > 0)
    return message.reply(
      `\`❌\` | I don't have one of these permissions \`ViewChannel\`, \`SendMessages\`, \`ManageMessages\`, \`EmbedLinks\`.\nPlease double check them in your server role & channel settings.`
    );

  //Check Bot Command Permissions
  if (!message.guild.members.cache.get(client.user.id).permissions.has(command.permissions.bot || [])) {
    return message.reply({
      content: `\`❌\` | I don't have permission \`${command.permissions.bot.join(", ")}\` to execute this command.`,
    });
  }

  //Check User Permissions
  if (!message.member.permissions.has(command.permissions.user || [])) {
    return message.reply({
      content: `\`❌\` | You don't have permission \`${command.permissions.user.join(", ")}\` to execute this command.`,
    });
  }

  //Voice Channel only
  if (command.settings.inVc && !memberChannel) {
    return message.reply(`\`❌\` | You must be in a Voice channel to use this command.`);
  }

  //Same Voice Channel only
  if (command.settings.sameVc && player && botChannel !== memberChannel) {
    return message.reply(`\`❌\` | You must be in the same Voice channel as mine to use this command.`);
  }

  //Player required
  if (command.settings.player && !player) {
    return message.reply(`\`❌\` | No player exists for this server.`);
  }

  if (command.settings.current && !player.currentTrack) {
    return message.reply(`\`❌\` | There is nothing playing right now.`);
  }

  //Check Owner Only
  if (command.settings.owner && message.author.id !== client.owner) {
    return message.reply({
      content: `\`❌\` | Only my owner can use this command!`,
    });
  }

  //args
  if (command.settings.args && !args.length) {
    return message.reply(`\`❌\` | You didn't provide any valid arguments.`);
  }

  command.run(client, message, args);
};
