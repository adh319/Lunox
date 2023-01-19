const fs = require("fs");

module.exports = (client) => {
    fs.readdirSync("./src/events/botEvents/").forEach((dir) => {
        const files = fs.readdirSync(`./src/events/botEvents/${dir}`).filter((file) => file.endsWith(".js"));
        for (const file of files) {
            try {
                const event = require(`../events/botEvents/${dir}/${file}`);

                const eventName = event.event || file.replace(".js", "");
                client.on(eventName, event.run.bind(null, client));
            } catch (err) {
                console.log(`Error while loading event: \n${err}`);
                console.log(err);
            }
        }
    });

    console.log("[INFO] Client Events Loaded!");
};
