const { white, red } = require("chalk");

module.exports.run = async (client, info) => {
	console.log(white(" [") + red("ERROR") + white("] ") + red("Rate Limited, Sleeping for ") + white(0) + red(" seconds"));
};
