module.exports = (client) => {
    require("./database/LoadDatabase.js")(client);
    require("./database/LoadPremium.js")(client);
    require("./database/LoadSetting.js")(client);

    console.log("[INFO] Database Events Loaded!");
};
