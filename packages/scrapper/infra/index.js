const path = require('path');
const {readdir, createReadStream} = require('fs-extra');
const {processCatalogs} = require('./../processor');
const downloader = require('./../downloader').main;

require('dotenv').config()

(async () => {
  try {
    await downloader();

    const files = await readdir(path.resolve(__dirname, `./../${process.env.TMP_FOLDER}`))
    const catalogsFilename = files.find(filename => filename.toLowerCase().includes('catalogos'))

    const streamCatalogsFile = createReadStream(path.join(__dirname, `./../${process.env.TMP_FOLDER}/${catalogsFilename}`))
    const hashTableCatalogs = await processCatalogs(streamCatalogsFile);

    console.log(hashTableCatalogs)
  } catch (e) {
    console.log(e)
  }
})();