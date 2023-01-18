const { red, white } = require("chalk");

module.exports.run = async (client, error, id) => {
    console.log(white("[") + red("ERROR") + white("] ") + red("Shard ") + white(id) + red(" Shard Errored!"));
};
