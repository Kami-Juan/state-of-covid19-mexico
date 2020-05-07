const catalogs = require('./catalogs').main;
const database = require('./database-covid').main;

const main = () => Promise.all([catalogs(), database()]);

exports.main = main;