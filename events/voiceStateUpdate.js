const delay = require("delay");
const { PermissionsBitField, EmbedBuilder } = require("discord.js");

module.exports.run = async (client, oldState, newState) => {
  const player = client.poru.players.get(newState.guild.id);
  if (!player) return;

  if (!newState.guild.members.cache.get(client.user.id).voice.channelId)
    player.destroy();

  if (
    newState.channelId &&
    newState.channel.type == "GUILD_STAGE_VOICE" &&
    newState.guild.members.me.voice.suppress
  ) {
    if (
      newState.guild.members.me.permissions.has(
        PermissionsBitField.Flags.Connect
      ) ||
      (newState.channel &&
        newState.channel
          .permissionsFor(nS.guild.members.me)
          .has(PermissionsBitField.Flags.Speak))
    ) {
      newState.guild.members.me.voice.setSuppressed(false);
    }
  }

  if (oldState.id === client.user.id) return;
  if (!oldState.guild.members.cache.get(client.user.id).voice.channelId) return;

  const vcRoom = oldState.guild.members.me.voice.channel.id;

  const leaveEmbed = client.channels.cache.get(player.textChannel);

  if (
    oldState.guild.members.cache.get(client.user.id).voice.channelId ===
    oldState.channelId
  ) {
    if (
      oldState.guild.members.me.voice?.channel &&
      oldState.guild.members.me.voice.channel.members.filter((m) => !m.user.bot)
        .size === 0
    ) {
      await delay(12000);

      const vcMembers = oldState.guild.members.me.voice.channel?.members.size;
      if (!vcMembers || vcMembers === 1) {
        if (!player) return;
        await player.destroy();
        const TimeoutEmbed = new EmbedBuilder()
          .setDescription(
            `\`👋\` | I was left alone in <#${vcRoom}>: \`Disconnected\``
          )
          .setColor(client.color);
        try {
          if (leaveEmbed) leaveEmbed.send({ embeds: [TimeoutEmbed] });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }
};
