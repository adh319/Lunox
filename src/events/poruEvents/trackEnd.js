module.exports.run = async (client, player) => {
    if (player.message) await player.message.delete();

    if (player.autoplay === true) {
        const trackSearch = player.currentTrack.info;

        const ytUri = /^(https?:\/\/)?(www\.)?(m\.)?(music\.)?(youtube\.com|youtu\.?be)\/.+$/gi.test(trackSearch.uri);

        if (!ytUri) {
            player.stop();
        } else {
            try {
                const source = client.config.playSource;
                const identifier = trackSearch.identifier;
                const search = `https://music.youtube.com/watch?v=${identifier}&list=RD${identifier}`;
                const res = await client.poru.resolve(search, source);

                for (const track of res.tracks) {
                    track.info.requester = trackSearch.requester;
                }

                await player.queue.add(res.tracks[Math.floor(Math.random() * res.tracks.length) ?? 2]);
            } catch (error) {
                ///
            }
        }
    }
};
