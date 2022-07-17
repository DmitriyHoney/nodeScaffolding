'use strict';

const fs = require('fs');
const path = '../src/db/entity/';

module.exports = ({ name, data }) => new Promise((resolve, reject) => {
  const fileName = Date.now();
  fs.readdir(path, async (err, files) => {
    if (err) console.error(err);
    if (!files.includes(name)) {
      try {
        await fs.promises.mkdir(path + name);
      } catch (e) {
        reject(e);
      }
    }
    fs.writeFile(
      `${path}${name}/${fileName}.json`,
      JSON.stringify(data), (err) => {
        if (err) reject(err);
        resolve(fileName);
      });
  });
});
