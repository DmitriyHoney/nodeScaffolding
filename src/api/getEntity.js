'use strict';

const fs = require('fs');

module.exports = ({ entityName, id }) => new Promise((resolve, reject) => {
  console.log(entityName, id);
  fs.readFile(`./db/entity/${entityName}/${id}.json`, 'utf8', (err, data) => {
    if (err) {
      resolve([]);
      console.error(err);
    }
    resolve(data);
  });
});
