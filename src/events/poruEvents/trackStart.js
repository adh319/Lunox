const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const formatDuration = require("../../structures/FormatDuration.js");
const GControl = require("../../settings/models/Control.js");
const capital = require("node-capitalize");

module.exports.run = async (client, player, track) => {
  let Control = await GControl.findOne({ guild: player.guildId });

  // This is the default setting for button control
  if (!Control) {
    Control = await GControl.create({
      guild: player.guildId,
      playerControl: "enable",
    });
  }

  if (!player) return;

  const titles = track.info.title.length > 20 ? track.info.title.substr(0, 20) + "..." : track.info.title;
  const authors = track.info.author.length > 20 ? track.info.author.substr(0, 20) + "..." : track.info.author;
  const trackDuration = track.info.isStream ? "LIVE" : formatDuration(track.info.length);
  const trackAuthor = track.info.author ? authors : "Unknown";
  const trackTitle = track.info.title ? titles : "Unknown";

  const Started = new EmbedBuilder()
    .setAuthor({
      name: `Started Playing`,
      iconURL: "https://cdn.discordapp.com/attachments/1014342568554811443/1025740239236517908/music-disc.gif",
    })
    .setThumbnail(track.info.image)
    .setDescription(`**[${trackTitle}](${track.info.uri})**`)
    .addFields([
      { name: `Author:`, value: `${trackAuthor}`, inline: true },
      { name: `Requested By:`, value: `${track.info.requester}`, inline: true },
      { name: `Duration:`, value: `${trackDuration}`, inline: true },
    ])
    .setColor(client.color)
    .setFooter({ text: `Loop Mode: ${capital(player.loop)} • Queue Left: ${player.queue.length}` })
    .setTimestamp();

  const bPause = new ButtonBuilder().setCustomId("pause").setLabel("Pause").setStyle(ButtonStyle.Primary);
  const bReplay = new ButtonBuilder().setCustomId("replay").setLabel("Replay").setStyle(ButtonStyle.Primary);
  const bStop = new ButtonBuilder().setCustomId("stop").setLabel("Stop").setStyle(ButtonStyle.Danger);
  const bSkip = new ButtonBuilder().setCustomId("skip").setLabel("Skip").setStyle(ButtonStyle.Primary);
  const bLoop = new ButtonBuilder().setCustomId("loop").setLabel("Loop").setStyle(ButtonStyle.Primary);

  const button = new ActionRowBuilder().addComponents(bPause, bReplay, bStop, bSkip, bLoop);

  // When set to "disable", button control won't show.
  if (Control.playerControl === "disable") {
    return client.channels.cache
      .get(player.textChannel)
      .send({ embeds: [Started] })
      .then((x) => (player.message = x));
  }

  // When player is playing stream this button disabled
  if (track.info.isStream) {
    bPause.setDisabled(true);
    bReplay.setDisabled(true);
    bLoop.setDisabled(true);
  }

  const nplaying = await client.channels.cache
    .get(player.textChannel)
    .send({ embeds: [Started], components: [button] })
    .then((x) => (player.message = x));

  const filter = (message) => {
    if (message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
    else {
      message.reply({
        content: `\`❌\` | You need to be in a same/voice channel to use this button.`,
        ephemeral: true,
      });
    }
  };

  const collector = nplaying.createMessageComponentCollector({
    filter,
    time: 180000,
  });

  collector.on("collect", async (message) => {
    if (message.customId === "loop") {
      if (message.user.id !== player.currentTrack.info.requester.id) {
        return message.reply({ content: `\`❌\` | You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if (!player) {
        collector.stop();
      } else if (player.loop === "NONE") {
        message.deferUpdate();

        player.setLoop("TRACK");

        Started.setFooter({ text: `Loop Mode: ${capital(player.loop)} • Queue Left: ${player.queue.length}` });
        bLoop.setLabel("Queue").setStyle(ButtonStyle.Success);

        await nplaying.edit({ embeds: [Started], components: [button] });
      } else if (player.loop === "TRACK") {
        message.deferUpdate();

        player.setLoop("QUEUE");

        Started.setFooter({ text: `Loop Mode: ${capital(player.loop)} • Queue Left: ${player.queue.length}` });
        bLoop.setLabel("Disable").setStyle(ButtonStyle.Danger);

        await nplaying.edit({ embeds: [Started], components: [button] });
      } else if (player.loop === "QUEUE") {
        message.deferUpdate();

        player.setLoop("NONE");

        Started.setFooter({ text: `Loop Mode: ${capital(player.loop)} • Queue Left: ${player.queue.length}` });
        bLoop.setLabel("Loop").setStyle(ButtonStyle.Primary);

        await nplaying.edit({ embeds: [Started], components: [button] });
      }
    } else if (message.customId === "replay") {
      if (message.user.id !== player.currentTrack.info.requester.id) {
        return message.reply({ content: `\`❌\` | You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if (!player) {
        collector.stop();
      } else if (!player.currentTrack.info.isSeekable) {
        const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`❌\` | Song can't be replay`);

        return message.reply({ embeds: [embed], ephemeral: true });
      } else {
        message.deferUpdate();

        await player.seekTo(0);
      }
    } else if (message.customId === "stop") {
      if (message.user.id !== player.currentTrack.info.requester.id) {
        return message.reply({ content: `\`❌\` | You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if (!player) {
        collector.stop();
      } else {
        message.deferUpdate();

        if (player.message) await player.message.delete();

        await player.destroy();
      }
    } else if (message.customId === "pause") {
      if (message.user.id !== player.currentTrack.info.requester.id) {
        return message.reply({ content: `\`❌\` | You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if (!player) {
        collector.stop();
      } else if (player.isPaused) {
        message.deferUpdate();

        player.pause(false);

        Started.setAuthor({
          name: `Started Playing`,
          iconURL: "https://cdn.discordapp.com/attachments/1014342568554811443/1025740239236517908/music-disc.gif",
        });

        bPause.setLabel("Pause").setStyle(ButtonStyle.Primary);

        await nplaying.edit({ embeds: [Started], components: [button] });
      } else {
        message.deferUpdate();

        player.pause(true);

        Started.setAuthor({
          name: `Song Paused`,
          iconURL: "https://cdn.discordapp.com/attachments/1014342568554811443/1025740239236517908/music-disc.gif",
        });

        bPause.setLabel("Resume").setStyle(ButtonStyle.Success);

        await nplaying.edit({ embeds: [Started], components: [button] });
      }
    } else if (message.customId === "skip") {
      if (message.user.id !== player.currentTrack.info.requester.id) {
        return message.reply({ content: `\`❌\` | You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if (!player) {
        collector.stop();
      } else if (!player || player.queue.size == 0) {
        const embed = new EmbedBuilder().setDescription(`\`❌\` | Queue was: \`Empty\``).setColor(client.color);

        return message.reply({ embeds: [embed], ephemeral: true });
      } else {
        message.deferUpdate();

        await player.stop();
      }
    }
  });
};
