const fs = require("fs");

module.exports = (client) => {
    fs.readdirSync("./src/events/poruEvents/").forEach((dir) => {
        const commands = fs.readdirSync(`./src/events/poruEvents/${dir}`).filter((file) => file.endsWith(".js"));

        for (const file of commands) {
            try {
                const pull = require(`../events/poruEvents/${dir}/${file}`);
                if (pull.event && typeof pull.event !== "string") {
                    continue;
                }
                pull.event = pull.event || file.replace(".js", "");
                client.poru.on(pull.event, pull.run.bind(null, client));
            } catch (err) {
                console.log(`Error while loading poru event: \n${err}`);
            }
        }
    });

    console.log("[INFO] Poru Events Loaded!");
};
