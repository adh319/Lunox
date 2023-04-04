const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { supportUrl } = require("../../../settings/config.js");

module.exports.run = async (client, message) => {
    //Ignoring bot, system, dm and webhook messages
    if (message.author.bot || !message.guild || message.system || message.webhookId) return;

    await client.createMessage(message);

    let prefix = client.prefix;
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);

    if (message.content.match(mention)) {
        const embed = new EmbedBuilder().setColor(client.color).setDescription(`My prefix for this server is: \`/\``);

        message.reply({ embeds: [embed] });
    }

    //remove prefix for owner
    if (client.owner.includes(message.member.id) && !client.owner.includes(client.user.id) && !message.content.startsWith(prefix)) {
        prefix = "";
    }

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/g);

    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd);

    //Finding command from aliases
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (!command) return;

    const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setLabel("Support").setURL(supportUrl).setStyle(ButtonStyle.Link));

    if (client.dev.has(true) && message.author.id !== client.owner) {
        return message.reply({
            content: `\`❌\` | ${client.user} is under maintenance. Sorry for the inconvinience.\n\nThank You.`,
            components: [row],
        });
    }

    console.log(
        `[COMMAND] - ${command.name} executed by ${message.author.tag} | ${client.user.username} in ${message.guild.name} (${message.guild.id})`,
    );

    //Default Permission
    const botPermissions = ["ViewChannel", "SendMessages", "EmbedLinks"];
    const botMissingPermissions = [];

    for (const perm of botPermissions) {
        if (!message.channel.permissionsFor(message.guild.members.me).has(perm)) {
            botMissingPermissions.push(perm);
        }
    }

    if (botMissingPermissions.length > 0)
        return message.reply({
            content: `\`❌\` | I don't have one of these permissions \`ViewChannel\`, \`SendMessages\`, \`EmbedLinks\`.\nPlease double check them in your server role & channel settings.`,
            components: [row],
        });

    //Check Owner
    if (command.owner && message.author.id !== client.owner) {
        return message.reply({ content: `\`❌\` | Only my owner can use this command!` });
    }

    //Error handling
    try {
        command.run(client, message, args);
    } catch (error) {
        console.log(error);

        return message.reply({ content: `\`❌\` | Something went wrong.`, components: [row] });
    }
};
