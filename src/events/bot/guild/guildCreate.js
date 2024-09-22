const { createDataGuild } = require("../../../functions/createData.js");

module.exports = async (client, guild) => {
    await createDataGuild(client, guild);
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
