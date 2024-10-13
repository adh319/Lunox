const { handleButtonInteraction } = require('../../../functions/PlayerbuttonHandler.js')
const { createButtonRows } = require('../../../functions/PlayerbuttonCreator.js')
const { convertTime } = require("../../../functions/timeFormat.js");
const { EmbedBuilder } = require('discord.js')
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const formatString = (str = 'Unknown', maxLength = 30) => 
  str.length > maxLength ? str.substr(0, maxLength - 3) + '...' : str;

const createTrackEmbed = (client, player, track) => {
  const trackTitle = formatString(track.title).replace(/ - Topic$/, '');
  const trackAuthor = formatString(track.author, 25).replace(/ - Topic$/, '');
  const trackDuration = track.isStream ? 'LIVE' : convertTime(track.duration);

  return new EmbedBuilder()
    .setAuthor({
      name: player.paused ? 'Song Paused' : 'Now Playing',
      iconURL: client.user.displayAvatarURL(),
    })
    .setColor(client.config.embedColor)
    .setThumbnail(track.artworkUrl)
    .setDescription(`**[${trackTitle} - ${trackAuthor}](${track.uri})**`)
    .addFields(
      { name: 'Duration', value: `\`${trackDuration}\``, inline: true },
      { name: 'Requested by', value: `${track.requester}`, inline: true },
      { name: 'Source', value: `${capitalize(track.source)}`, inline: true }
    );
};

module.exports = async (client, player, track) => {
  if (!player) return;

  const trackMsg = createTrackEmbed(client, player, track);
  const buttonRows = createButtonRows(client, player);

  const nplaying = await client.channels.cache.get(player.textId).send({
    embeds: [trackMsg],
    components: buttonRows,
  });

  player.message = nplaying;

  const collector = nplaying.createMessageComponentCollector();

  collector.on('collect', async (message) => {
    if (!player) return collector.stop();
    await handleButtonInteraction(message, client, player, track);
  });
};

/**
 * Project: Lunox
 * Author: adh319`
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 * modified by bre4d77 
 */
