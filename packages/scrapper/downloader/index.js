const {main: catalogs} = require('./catalogs');
const {main: database} = require('./database-covid');

(async () => {
  await catalogs();
  await database();
})();