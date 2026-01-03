const Logger = require("../../../utils/logger");

module.exports = (client, node, code, reason) => {
    Logger.warn(`Node ${node.options.name} disconnected`, code, reason);
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
