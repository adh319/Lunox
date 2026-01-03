const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");
const { Rainlink, Library } = require("rainlink");

class MainClient extends Client {
    constructor() {
        super({
            shards: getInfo().SHARD_LIST,
            shardCount: getInfo().TOTAL_SHARDS,
            failIfNotExists: true,
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false,
            },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
            partials: [Partials.Message, Partials.Channel, Partials.Reaction],
        });

        this.config = require("../settings/config.js");
        this.guildData = require("../databases/schema/guild.js");
        this.userData = require("../databases/schema/user.js");
        this.prefix = new Collection();
        this.aliases = new Collection();
        this.slash = new Collection();
        this.data = new Map();

        this.rainlink = new Rainlink({
            nodes: this.config.rainlinkNodes,
            library: new Library.DiscordJS(this),
            plugins: this.config.rainlinkPlugins,
            options: this.config.rainlinkOptions,
        });

        if (!this.token) this.token = this.config.token;

        ["anticrash", "database", "events", "commands", "rainlink"].forEach((handler) => {
            require(`../handlers/${handler}`)(this);
        });

        this.cluster = new ClusterClient(this);
    }

    async connect() {
        return super.login(this.token);
    }
}

module.exports = MainClient;

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
