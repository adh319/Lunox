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

        const client = this;

        this.config = require("./settings/config.js");
        this.emoji = require("./settings/emoji.js");
        this.color = this.config.color;
        this.prefix = this.config.prefix;
        this.owner = this.config.owner;
        this.commands = new Collection();
        this.aliases = new Collection();
        this.slashCommands = new Collection();
        this.premium = new Collection();
        this.dev = new Set();

        this.manager = new Rainlink({
            nodes: this.config.rainlinkNodes,
            library: new Library.DiscordJS(this),
            plugins: this.config.rainlinkPlugins,
            options: this.config.rainlinkOptions,
        });

        if (!this.token) this.token = this.config.token;

        ["antiCrash", "database", "events", "commands", "rainlink"].forEach((handler) => {
            require(`./handlers/${handler}`)(this);
        });

        this.cluster = new ClusterClient(this);
    }
    connect() {
        return super.login(this.token);
    }
}

module.exports = MainClient;
