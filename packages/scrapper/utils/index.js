const path = require('path');

const unzipper = require('unzipper');
const {createWriteStream, mkdirSync, existsSync} = require('fs');

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