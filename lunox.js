const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Poru } = require('poru');

class MainClient extends Client {     
  constructor() {
    super({
      messageCacheLifetime: 60,
      fetchAllMembers: false,
      messageCacheMaxSize: 10,
      restTimeOffset: 0,
      restWsBridgetimeout: 100,
      failIfNotExists: true,
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
		reconnectTime: 0,
		resumeKey: "Lunox",
		resumeTimeout : 60,
		defaultPlatform: "spsearch", // you can change it to "ytmseacrh", "scsearch", "ytsearch".
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
