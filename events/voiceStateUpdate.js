module.exports.run = (client, oldVoice, newVoice) => {
  const player = client.poru.players.get(oldVoice.guild.id);
  if (!player) return;

  if (!newVoice.guild.members.me.voice.channel) {
    player.destroy();
  }
};
