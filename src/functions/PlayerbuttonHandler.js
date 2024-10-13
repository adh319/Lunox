const {
  EmbedBuilder
} = require('discord.js');
const {
  createButtonRows
} = require('./PlayerbuttonCreator');
const {
  createTrackEmbed
} = require('../events/rainlink/player/trackStart.js');

const handleButtonInteraction = async (message, client, player, track) => {
  const embed = new EmbedBuilder().setColor(client.config.embedColor);

  if (!message.member.voice.channel || player.voiceId !== message.member.voice.channelId) {
    embed.setDescription(`You must be in the same voice channel as the bot.`);
    return message.reply({
      embeds: [embed], ephemeral: true
    });
  }

  if (message.user.id !== track.requester.id) {
    embed.setDescription(`Only the requester can use this button.`);
    return message.reply({
      embeds: [embed], ephemeral: true
    });
  }

  const actionHandlers = {
    pause: handlePause,
    prev: handlePrev,
    skip: handleSkip,
    loop: handleLoop,
    shuffle: handleShuffle,
    voldown: handleVolumeDown,
    volup: handleVolumeUp,
    stop: handleStop,
  };

  const handler = actionHandlers[message.customId];
  if (handler) await handler(message, player, client);
};

const handlePause = async (message, player, client) => {
  const trackMsg = createTrackEmbed(client, player, player.queue.current);
  player.paused ? player.resume(): player.pause();

  trackMsg.setAuthor({
    name: player.paused ? 'Song Paused': 'Now Playing',
    iconURL: client.user.displayAvatarURL(),
  });

  await message.edit({
    embeds: [trackMsg],
    components: createButtonRows(client, player),
  });
  await message.deferUpdate();
};

const handlePrev = async (message, player) => {
  const embed = new EmbedBuilder().setColor(message.client.config.embedColor);

  if (!player.queue.previous.length) {
    embed.setDescription(`Previous song not found.`);
    return message.reply({
      embeds: [embed], ephemeral: true
    });
  }

  player.previous();
  await message.deferUpdate();
};

const handleSkip = async (message, player, client) => {
  const embed = new EmbedBuilder().setColor(client.config.embedColor);

  if (player.queue.isEmpty && !client.data.get('autoplay', player.guildId)) {
    embed.setDescription(`Queue is empty. Skip not possible.`);
    return message.reply({
      embeds: [embed], ephemeral: true
    });
  }

  player.skip();
  await message.deferUpdate();
};

const handleLoop = async (message, player) => {
  const embed = new EmbedBuilder().setColor(message.client.config.embedColor);
  const loopModes = ['none',
    'song',
    'queue'];
  const nextLoop = loopModes[(loopModes.indexOf(player.loop) + 1) % loopModes.length];

  embed.setDescription(`Loop mode has been set to \`${nextLoop}\`.`);
  player.setLoop(nextLoop);

  return message.reply({
    embeds: [embed], ephemeral: true
  });
};

const handleShuffle = async (message, player) => {
  const embed = new EmbedBuilder().setColor(message.client.config.embedColor);

  if (player.queue.isEmpty) {
    embed.setDescription(`Queue is empty. Shuffle not possible.`);
    return message.reply({
      embeds: [embed], ephemeral: true
    });
  }

  player.queue.shuffle();
  embed.setDescription(`Queue has been shuffled.`);

  return message.reply({
    embeds: [embed], ephemeral: true
  });
};

const handleVolumeDown = async (message, player, client) => adjustVolume(message, player, client, -10);
const handleVolumeUp = async (message, player, client) => adjustVolume(message, player, client, +10);

const adjustVolume = async (message, player, client, change) => {
  const newVolume = Math.min(client.config.maxVolume, Math.max(client.config.minVolume, player.volume + change));
  player.setVolume(newVolume);

  const embed = new EmbedBuilder()
  .setColor(client.config.embedColor)
  .setDescription(`Volume has been set to \`${newVolume}%\`.`);

  return message.reply({
    embeds: [embed], ephemeral: true
  });
};

const handleStop = async (message, player) => {
  player.stop();
  await message.deferUpdate();
};

module.exports = {
  handleButtonInteraction
};