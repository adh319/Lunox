const { ApplicationCommandOptionType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "switch",
    description: "Move the position of two songs.",
    category: "Music",
    options: [
        {
            name: "song",
            description: "The song which you want to move.",
            type: ApplicationCommandOptionType.Number,
            required: true,
            min_value: 1,
        },
        {
            name: "position",
            description: "New position of the song.",
            type: ApplicationCommandOptionType.Number,
            required: true,
            min_value: 2,
        },
    ],
    permissions: {
        bot: [],
        channel: [],
        user: [],
    },
    settings: {
        inVc: true,
        sameVc: true,
        player: true,
        current: false,
        owner: false,
        premium: false,
    },
    run: async (client, interaction) => {
        await interaction.deferReply({ ephemeral: true });

        function moveArrayElement(arr, fromIndex, toIndex) {
            arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
            return arr;
        }

        const player = client.poru.players.get(interaction.guild.id);

        const from = interaction.options.getNumber("song");
        const to = interaction.options.getNumber("position");

        if (from === to || isNaN(from) || from < 1 || from > player.queue.length || isNaN(to) || to < 1 || to > player.queue.length)
            return interaction.editReply(`\`❌\` | That song does not exist in the queue.`);

        const moved = player.queue[from - 1];
        await moveArrayElement(player.queue, from - 1, to - 1);

        const embed = new EmbedBuilder().setColor(client.color).setDescription(`\`☑️\` | Moved \`${moved.info.title}\` to \`${to}\`.`);

        return interaction.editReply({ embeds: [embed] });
    },
};
