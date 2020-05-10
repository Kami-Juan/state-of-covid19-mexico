require('dotenv').config()

const path = require('path');

const {readdir, createReadStream, ensureDir, remove} = require('fs-extra');

const {processCatalogs, processCovidDataRaw, processCovidDataJson} = require('./processor');
const downloader = require('./downloader').main;
const {jsonConverter} = require('./utils');

(async () => {
  try {
    console.log("Descargando información, espere...");
    await downloader();

    const files = await readdir(path.resolve(__dirname, `./${process.env.TMP_FOLDER}`));

    const catalogsFilename = files.find(filename => filename.toLowerCase().includes('catalogos'))
    const covidDataFilename = files.find(filename => filename.toLowerCase().includes('covid19'))

    console.log(`Descargado ${catalogsFilename}`)
    console.log(`Descargado ${covidDataFilename}`)

    const streamCatalogsFile = createReadStream(path.join(__dirname, `./${process.env.TMP_FOLDER}/${catalogsFilename}`));
    const streamCovidDataFile = createReadStream(path.join(__dirname, `./${process.env.TMP_FOLDER}/${covidDataFilename}`));

    console.log("Procesando información...");

    const hashTableCatalogs = await processCatalogs(streamCatalogsFile);
    const covidDataJsonStream = await processCovidDataRaw(streamCovidDataFile, hashTableCatalogs);
    const formattedCovidData = await processCovidDataJson(covidDataJsonStream);

    await ensureDir(path.join(__dirname, `./${process.env.DATA_FOLDER}`));
    jsonConverter(formattedCovidData, `./${process.env.DATA_FOLDER}/covid-data.json`);

    console.log("Removiendo datos temporales...");

    if (process.env.DELETE_RESOURCES && process.env.DELETE_RESOURCES === "true") {
      await remove(path.join(__dirname, `./${process.env.TMP_FOLDER}`));
    }

    console.log("Terminado");
  } catch (e) {
    console.log(e)
  }
})();