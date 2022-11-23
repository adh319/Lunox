const { white, green } = require("chalk");

module.exports.run = async (client, id) => {
    console.log(white('[') + green('INFO') + white('] ') + green('Shard ') + white(id) + green(' Shard Ready!'));
}