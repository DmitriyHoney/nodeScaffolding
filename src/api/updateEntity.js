'use strict';

const fs = require('fs');
const path = '../src/db/entity/';

module.exports = ({ name, id, data }) => new Promise((resolve, reject) => {
  fs.writeFile(
    `${path}${name}/${id}.json`,
    JSON.stringify(data), (err) => {
      if (err) reject(err);
      resolve(data);
    });
});
