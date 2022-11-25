const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Poru } = require('poru');

class MainClient extends Client {
  constructor() {
    super({
      shards: "auto",
      allowedMentions: {
        parse: ['roles', 'users', 'everyone'],
        repliedUser: false,
      },
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions
      ],
      partials: [
        Partials.Message, 
        Partials.Channel, 
        Partials.Reaction
      ],
    });

    const client = this;

    this.config = require("./settings/config.js");
    this.color = this.config.color;
    this.prefix = this.config.prefix;
    this.owner = this.config.owner;
    if(!this.token) this.token = this.config.token;
        
    process.on('unhandledRejection', error => console.log(error));
    process.on('uncaughtException', error => console.log(error));
        
    this.poru = new Poru(this, this.config.nodes, {
		defaultPlatform: client.config.defaultSource, // you can change it to "ytmseacrh", "scsearch", "ytsearch".
		spotify: {
			clientID: this.config.spotifyId,
			clientSecret: this.config.spotifySecret,
			playlistLimit: 10,
		},
		deezer: {
			playlistLimit: 10,
		},
		apple: {
			playlistLimit: 10,
		},
		send(id, payload) {
			const guild = client.guilds.cache.get(id);
			if (guild) guild.shard.send(payload);
		},
    });
        
    this.commands = new Collection();
    this.aliases = new Collection();
    this.slashCommands = new Collection();

    ['commands', 'events', 'slash', 'poruEvent'].forEach((handler) => {
      require(`./handlers/${handler}`)(client);
    });
        
  }
	connect() {
		return super.login(this.token);
	}
};

module.exports = MainClient;
