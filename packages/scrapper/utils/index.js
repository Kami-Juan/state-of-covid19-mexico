const { mkdirSync, existsSync, writeFile, ensureDirSync} = require('fs-extra');
const {createWriteStream} = require('fs')
const path = require('path');

const XLSX = require('xlsx');
const unzipper = require('unzipper');

exports.unzip = (zipStream, filename = null, outputDir = path.join(__dirname, './../data')) => {
  const zipRequest = zipStream.pipe(unzipper.Parse());

  if (!existsSync(outputDir)) {
    mkdirSync(`${outputDir}`, {recursive: true});
  }

  zipRequest.on('entry', (entry) => {
    const fullZipName = entry.path;
    const singleName = filename || fullZipName.split("/").pop();

    entry.pipe(createWriteStream(`${outputDir}/${singleName}`));
  });
}

exports.promiseUnzip = (zipStream) => {
  return new Promise((resolve, reject) => {
    if (!existsSync(path.join(__dirname,`./../${process.env.TMP_FOLDER}`))) {
      mkdirSync(path.join(__dirname,`./../${process.env.TMP_FOLDER}`), {recursive: true});
    }

    zipStream
    .on('end', () => resolve())
    .on('error', () => reject())
    .pipe(unzipper.Parse())
    .on('entry', (entry) => {
      // storeStream(entry, entry.path.split("/").pop())
      entry.pipe(createWriteStream(path.join(__dirname, `./../${process.env.TMP_FOLDER}/${entry.path.split("/").pop()}`)))
    });
  })
}

exports.readExcelStream = (stream, cb) => {
  const buffers = [];

  stream.on('data', (data) => {
    buffers.push(data);
  });

  stream.on('end', () => {
    const buffer = Buffer.concat(buffers);

    const workbook = XLSX.read(buffer, {
      type: "buffer",
      raw: true
    });

    cb(workbook);
  });
}

exports.convertArrayToMap = (list, key = 'CLAVE') => list.reduce((prev, current) => prev.set(current[key], current), new Map())

exports.getDescriptionByCatalog = (catalog, pos) => catalog.get(parseInt(pos))["DESCRIPCIÓN"].trim()

const storeStream = async (stream, filename) => {
  // ensureDirSync(`./../${process.env.TMP_FOLDER}`);
  stream.pipe(createWriteStream(path.resolve(__dirname, `./../${process.env.TMP_FOLDER}/${filename}`)))
}

exports.jsonConverter = (data, dir) => {
  const json = JSON.stringify(data, null, 2);

  writeFile(dir, json, (err) => {
    if (err) throw err;
  });
};