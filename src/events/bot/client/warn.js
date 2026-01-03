const Logger = require("../../../utils/logger");

module.exports = async (client) => {
    Logger.warn(`Warned ${client.user.tag} (${client.user.id})`);
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
