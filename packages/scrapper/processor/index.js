exports.processCovidDataRaw = require('./database-covid').main;
exports.processCovidDataJson = require('./covid-data-byState').main;
exports.processCatalogs = require('./catalogs').main;