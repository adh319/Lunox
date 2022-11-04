const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const formatDuration = require('../structures/FormatDuration.js');

module.exports.run = async (client, player, track, interaction) => {
    
  const trackDuration = formatDuration(track.info.length);
  
  const button = new ActionRowBuilder()
    .addComponents(
      new ButtonBuilder()
        .setCustomId("pause")
        .setEmoji(`⏯️`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("prev")
        .setEmoji(`⏮️`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("stop")
        .setEmoji(`⏹️`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("skip")
        .setEmoji(`⏭`)
        .setStyle(ButtonStyle.Secondary),

      new ButtonBuilder()
        .setCustomId("loop")
        .setEmoji(`🔁`)
        .setStyle(ButtonStyle.Secondary),
    );
    
  
  const embed = new EmbedBuilder()
    .setAuthor({ name: `Started Playing`, iconURL: "https://cdn.discordapp.com/attachments/1014342568554811443/1025740239236517908/music-disc.gif" })    
    .setThumbnail(track.info.image)
    .setDescription(`**[${track.info.title}](${track.info.uri})**`)
    .addFields({ name: `Author:`, value: `${track.info.author}`, inline: true })
    .addFields({ name: `Requested By:`, value: `${track.info.requester}`, inline: true })
    .addFields({ name: `Duration:`, value: `${trackDuration}`, inline: true })
    .setColor(client.color)
    .setTimestamp();
    
  const embed2 = new EmbedBuilder()
    .setAuthor({ name: `Track Ended`, iconURL: client.user.displayAvatarURL({ dynamic: true }) })    
    .setThumbnail(track.info.image)
    .setDescription(`**[${track.info.title}](${track.info.uri})**`)
    .addFields({ name: `Author:`, value: `${track.info.author}`, inline: true })
    .addFields({ name: `Requested By:`, value: `${track.info.requester}`, inline: true })
    .addFields({ name: `Duration:`, value: `${trackDuration}`, inline: true })
    .setColor(client.color)
    .setTimestamp();
  
  const nplaying = await client.channels.cache.get(player.textChannel).send({ embeds: [embed], components: [button] });

  const filter = (message) => {
    if(message.guild.members.me.voice.channel && message.guild.members.me.voice.channelId === message.member.voice.channelId) return true;
    else {
      message.reply({ content: `You need to be in a same/voice channel to use this button.`, ephemeral: true });
    }
  };
  const collector = nplaying.createMessageComponentCollector({ filter, time: track.info.length });

  collector.on('collect', async (interaction) => {
    if (interaction.customId === "loop") {
      if (interaction.user.id !== player.currentTrack.info.requester.id) {
          return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if(!player) {
          collector.stop();
      } else if (player.loop === "NONE" ) {
          player.setLoop("TRACK");

          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`🔁\` | Loop has been set to: \`Current\``);

          interaction.reply({ embeds: [embed], ephemeral: true })
      } else if (player.loop === "TRACK" ) {
          player.setLoop("QUEUE");

          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`🔁\` | Loop has been set to: \`Queue\``);

          interaction.reply({ embeds: [embed], ephemeral: true })
      } else if (player.loop === "QUEUE" ) {
          player.setLoop("NONE");

          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`🚫\` | Loop mode has been: \`Disabled\``);

          interaction.reply({ embeds: [embed], ephemeral: true })
      }
    } else if (interaction.customId === "prev") {
      if (interaction.user.id !== player.currentTrack.info.requester.id) {
          return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if(!player) {
          collector.stop();
      } else if (!player.previousTrack) {
                    
          const embed = new EmbedBuilder()
            .setDescription(`\`❌\` | Previous track is: \`Not found\``)
            .setColor(client.color);
            
          interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
          await player.queue.unshift(player.previousTrack);
          await player.stop();
        
          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`⏮️\` | Track has been: \`Previous\``);
          
          await nplaying.delete();
          interaction.reply({ embeds: [embed], ephemeral: true })
      }
    } else if (interaction.customId === "stop") {
      if (interaction.user.id !== player.currentTrack.info.requester.id) {
          return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if(!player) {
          collector.stop();
      } else {
          await player.destroy();
          
          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`👋\` | Player has been: \`Disconnected\``);
          
          await nplaying.delete();
          interaction.reply({ embeds: [embed], ephemeral: true })
      }
    } else if (interaction.customId === "pause") {
      if (interaction.user.id !== player.currentTrack.info.requester.id) {
          return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if(!player) {
          collector.stop();
      }else if (player.isPaused) {
          player.pause(false);
          
          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`▶️\` | Player has been: \`Resumed\``);
              
          interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
          player.pause(true);
          
          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`⏸\` | Player has been: \`Paused\``);
              
          interaction.reply({ embeds: [embed], ephemeral: true })
      }
    } else if (interaction.customId === "skip") {
      if (interaction.user.id !== player.currentTrack.info.requester.id) {
          return interaction.reply({ content: `You are not allowed to use buttons for this message!`, ephemeral: true });
      } else if(!player) {
          collector.stop();
      } else if (!player || player.queue.size == 0) {
                  
          const embed = new EmbedBuilder()
            .setDescription(`\`❌\` | Next track is: \`Not found\``)
            .setColor(client.color);
              
          interaction.reply({ embeds: [embed], ephemeral: true })
      } else {
          await player.stop();

          const embed = new EmbedBuilder()
            .setColor(client.color)
            .setDescription(`\`⏭\` | Track has been: \`Skipped\``);
          
          await nplaying.delete();
          interaction.reply({ embeds: [embed], ephemeral: true })
      }
    }
  });
  collector.on('end', async (collected, reason) => {
    if(reason === "time") {
      nplaying.delete();
    }
  });
};
