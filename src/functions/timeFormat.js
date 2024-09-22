module.exports = {
    convertTime: (duration) => {
        const hours = Math.floor(duration / 3600000);
        const minutes = Math.floor((duration % 3600000) / 60000);
        const seconds = Math.floor((duration % 60000) / 1000);

        const formatTime = (time) => (time < 10 ? `0${time}` : time);

        const formattedHours = formatTime(hours);
        const formattedMinutes = formatTime(minutes);
        const formattedSeconds = formatTime(seconds);

        return duration < 3600000 ? `${formattedMinutes}:${formattedSeconds}` : `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    },

    convertNumber: (number, decPlaces) => {
        const abbrev = ["K", "M", "B", "T"];

        for (let i = abbrev.length - 1; i >= 0; i--) {
            const size = Math.pow(10, (i + 1) * 3);

            if (size <= number) {
                number = (Math.round((number * Math.pow(10, decPlaces)) / size) / Math.pow(10, decPlaces)).toString();

                if (number === "1000" && i < abbrev.length - 1) {
                    number = "1";
                    i++;
                }

                return number + abbrev[i];
            }
        }

        return number.toString();
    },

    chunk: (arr, size) => {
        const chunks = [];

        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }

        return chunks;
    },

    convertHmsToMs: (hms) => {
        const parts = hms.split(":").map(Number);
        const multipliers = [3600, 60, 1].slice(3 - parts.length);

        return parts.reduce((total, part, index) => total + part * multipliers[index], 0) * 1000;
    },
};

/**
 * Project: Lunox
 * Author: adh319
 * Company: EnourDev
 * This code is the property of EnourDev and may not be reproduced or
 * modified without permission. For more information, contact us at
 * https://discord.gg/xhTVzbS5NU
 */
