module.exports.run = async (client, error) => {
    console.log(`[WARN] Errored ${client.user.tag} (${client.user.id}) ${error}`);
};
