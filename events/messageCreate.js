module.exports.run = (client, message) => {
  //Ignoring bot, system, dm and webhook messages
  if (
    message.author.bot ||
    !message.guild ||
    message.system ||
    message.webhookId
  )
    return;

  if (!message.content.startsWith(client.config.prefix)) return;
  const args = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(/ +/g);

  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);

  //Finding command from aliases
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  const player = client.poru.players.get(message.guild.id);
  const memberChannel = message.member.voice.channelId;
  const botChannel = message.guild.members.me.voice.channelId;

  if (!command) return;

  //Voice Channel only
  if (command.inVc && !memberChannel) {
    return message.channel.send(
      "You must be in a Voice Channel to use this Command!"
    );
  }

  //Same Voice Channel only
  if (command.sameVc && player && botChannel !== memberChannel) {
    return message.channel.send("You must be in the same Voice Channel as me!");
  }

  //Player required
  if (command.player && !player) {
    return message.channel.send("No player exists for this server.");
  }

  if (command.current && !player.currentTrack) {
    message.channel.send("There is nothing playing right now.");
  }

  //args
  if (command.args && !args.length) {
    return message.channel.send(`You didn't provide any arguments.`);
  }

  command.run(client, message, args);
};
