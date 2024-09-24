// logger.js

const colors = {
    reset: "\x1b[0m",
    fgRed: "\x1b[31m",
    fgGreen: "\x1b[32m",
    fgMagenta: "\x1b[35m",
    fgBlue: "\x1b[34m",
    bgRed: "\x1b[41m",
    bgGreen: "\x1b[42m",
    bgYellow: "\x1b[43m"
};

const logWithColor = (text, color) => {
    console.log(`${color}${text}${colors.reset}`);
};

module.exports = {
    R: (text) => logWithColor(text, colors.fgRed),
    G: (text) => logWithColor(text, colors.fgGreen),
    Mag: (text) => logWithColor(text, colors.fgMagenta),
    B: (text) => logWithColor(text, colors.fgBlue),
    bgR: (text) => logWithColor(text, colors.bgRed),
    bgG: (text) => logWithColor(text, colors.bgGreen),
    bgY: (text) => logWithColor(text, colors.bgYellow),
};
