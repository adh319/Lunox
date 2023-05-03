const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Poru } = require("poru");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");
const GSearch = require("google-search-url");

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
        this.gsearch = GSearch;
        if (!this.token) this.token = this.config.token;

        this.poru = new Poru(this, this.config.nodes, this.config.poruOptions, {
            send: (guildId, payload) => {
                const guild = this.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            },
        });

        this.commands = new Collection();
        this.aliases = new Collection();
        this.slashCommands = new Collection();
        this.premium = new Collection();
        this.dev = new Set();

        ["AntiCrash", "Database", "Events", "Commands", "Slash", "Poru"].forEach((handler) => {
            require(`./handlers/${handler}`)(this);
        });

        this.cluster = new ClusterClient(this);
    }
    connect() {
        return super.login(this.token);
    }
}

module.exports = MainClient;
