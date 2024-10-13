const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const createButtonRows = (client, player) => {
  const playerEmoji = client.emoji.player;

  const row1 = new ActionRowBuilder().addComponents(
    createButton('pause', player.paused ? playerEmoji.resume : playerEmoji.pause, player.paused ? ButtonStyle.Primary : ButtonStyle.Secondary),
    createButton('voldown', playerEmoji.voldown),
    createButton('volup', playerEmoji.volup),
    createButton('loop', playerEmoji.loop)
  );

  const row2 = new ActionRowBuilder().addComponents(
    createButton('shuffle', playerEmoji.shuffle),
    createButton('prev', playerEmoji.previous),
    createButton('skip', playerEmoji.skip),
    createButton('stop', playerEmoji.stop, ButtonStyle.Danger)
  );

  return [row1, row2];
};

const createButton = (id, emoji, style = ButtonStyle.Secondary) => {
  return new ButtonBuilder().setCustomId(id).setEmoji(emoji).setStyle(style);
};

module.exports = { createButtonRows };
