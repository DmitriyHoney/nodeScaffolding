'use strict';

const fs = require('fs');
const path = require('path');

module.exports = (entityName) => new Promise((resolve, reject) => {
  fs.readdir(`./db/entity/${entityName}/`, (err, files) => {
    if (err) {
      resolve([]);
      console.error(err);
    }
    if (!files) {
      console.log(123);
      resolve([]);
      return;
    }
    resolve(files.map((file) => path.basename(file, '.json')));
  });
});
