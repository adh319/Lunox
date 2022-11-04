const { ShardingManager } = require('discord.js'); //imports the sharding manager
require("dotenv").config();

const manager = new ShardingManager('./index.js', { 
  token: process.env.TOKEN || "YOUR_BOT_TOKEN", //paste your token here
  respawn: true,
  autoSpawn: true,
  totalShards: 1, //amount of shards
  shardList: "auto", //edit it only if you know what are you doing
});

manager
  .spawn({ amount: manager.totalShards, delay: null, timeout: -1 })
  .then((shards) => {
    console.log(`[CLIENT] ${shards.size} shard(s) spawned.`);
  })
  .catch((err) => {
    console.log("[CLIENT] An error has occurred :", err);
  });

manager.on("shardCreate", (shard) => {
  shard.on("ready", () => {
    console.log(`[CLIENT] Shard ${shard.id} connected`);
  });
});