const {createWriteStream, mkdirSync, existsSync} = require('fs');
const path = require('path');
const fs = require('fs');

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

exports.jsonConverter = (data, dir) => {
  const json = JSON.stringify(data, null, 2);

  fs.writeFile(dir, json, (err) => {
    if (err) throw err;
  });
};