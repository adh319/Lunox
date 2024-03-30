const fs = require("fs");

module.exports = (client) => {
    fs.readdirSync("./src/events/ruvyriasEvents/").forEach((dir) => {
        const commands = fs.readdirSync(`./src/events/ruvyriasEvents/${dir}`).filter((file) => file.endsWith(".js"));

        for (const file of commands) {
            try {
                const pull = require(`../events/ruvyriasEvents/${dir}/${file}`);
                if (pull.event && typeof pull.event !== "string") {
                    continue;
                }
                pull.event = pull.event || file.replace(".js", "");
                client.ruvyrias.on(pull.event, pull.run.bind(null, client));
            } catch (err) {
                console.log(`Error while loading ruvyrias event: \n${err}`);
            }
        }
    });

    console.log("[INFO] Ruvyrias Events Loaded!");
};
