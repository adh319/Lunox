module.exports.run = async (client, player) => {
  if (player.message) await player.message.delete();
};
