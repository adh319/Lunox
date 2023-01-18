const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const { Poru } = require("poru");
const { ClusterClient, getInfo } = require("discord-hybrid-sharding");

class MainClient extends Client {
    constructor() {
        super({
            shards: getInfo().SHARD_LIST,
            shardCount: getInfo().TOTAL_SHARDS,
            messageCacheLifetime: 60,
            fetchAllMembers: false,
            messageCacheMaxSize: 10,
            restTimeOffset: 0,
            restWsBridgetimeout: 100,
            failIfNotExists: true,
            allowedMentions: {
                parse: ["roles", "users", "everyone"],
                repliedUser: false,
            },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMessageReactions,
            ],
            partials: [Partials.Message, Partials.Channel, Partials.Reaction],
        });

        const client = this;

        this.config = require("./settings/config.js");
        this.color = this.config.color;
        this.prefix = this.config.prefix;
        this.owner = this.config.owner;
        if (!this.token) this.token = this.config.token;

        this.poru = new Poru(this, this.config.nodes, this.config.poruOptions, {
            send(guildId, payload) {
                const guild = client.guilds.cache.get(guildId);
                if (guild) guild.shard.send(payload);
            },
        });

        this.commands = new Collection();
        this.aliases = new Collection();
        this.slashCommands = new Collection();
        this.userSettings = new Collection();

        ["Commands", "Database", "Events", "Slash", "Poru", "ErrorHandler", "Premium"].forEach((handler) => {
            require(`./handlers/${handler}`)(this);
        });

        this.cluster = new ClusterClient(this);
    }
    connect() {
        return super.login(this.token);
    }
}

module.exports = MainClient;
