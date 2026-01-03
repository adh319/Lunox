const Logger = require("../../../utils/logger");

module.exports = (client, node, error) => {
    Logger.error(`Node ${node.options.name} error`, error);
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
