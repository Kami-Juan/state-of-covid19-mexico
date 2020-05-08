require('dotenv').config()

const path = require('path');

const {readdir, createReadStream, ensureDir, remove} = require('fs-extra');

const {processCatalogs, processCovidDataRaw, processCovidDataJson} = require('./processor');
const downloader = require('./downloader').main;
const {jsonConverter} = require('./utils');

(async () => {
  try {
    await downloader();

    const files = await readdir(path.resolve(__dirname, `./${process.env.TMP_FOLDER}`));

    const catalogsFilename = files.find(filename => filename.toLowerCase().includes('catalogos'))
    const covidDataFilename = files.find(filename => filename.toLowerCase().includes('covid19'))

    const streamCatalogsFile = createReadStream(path.join(__dirname, `./${process.env.TMP_FOLDER}/${catalogsFilename}`));
    const streamCovidDataFile = createReadStream(path.join(__dirname, `./${process.env.TMP_FOLDER}/${covidDataFilename}`));

    const hashTableCatalogs = await processCatalogs(streamCatalogsFile);
    const covidDataJsonStream = await processCovidDataRaw(streamCovidDataFile, hashTableCatalogs);
    const formattedCovidData = await processCovidDataJson(covidDataJsonStream);

    await ensureDir(path.join(__dirname, `./${process.env.DATA_FOLDER}`));
    jsonConverter(formattedCovidData, `./${process.env.DATA_FOLDER}/covid-data.json`);

    await remove(path.join(__dirname, `./${process.env.TMP_FOLDER}`));
  } catch (e) {
    console.log(e)
  }
})();