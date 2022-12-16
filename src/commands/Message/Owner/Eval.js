module.exports = {
	name: "eval",
	description: "Bot eval.",
	category: "Owner",
	aliases: [],
	permissions: {
		bot: [],
		user: [],
	},
	settings: {
		inVc: false,
		sameVc: false,
		player: false,
		current: false,
		owner: true,
	},
	run: (client, message) => {
		const content = message.content.split(" ").slice(1).join(" ");

		const result = new Promise((resolve) => resolve(eval(content)));

		return result
			.then((output) => {
				if (typeof output !== "string") {
					output = require("util").inspect(output, { depth: 0 });
				}
				if (output.includes(client.token)) {
					output = output.replace(this.client.token, "LOL BRO");
				}
				return message.reply(`\`\`\`${output}\`\`\``, {
					code: "js",
				});
			})
			.catch((err) => {
				err = err.toString();

				if (err.includes(client.token)) {
					err = err.replace(this.client.token, "ABE SALE");
				}

				return message.reply(err, {
					code: "js",
				});
			});
	},
};
