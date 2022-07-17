'use strict';

const schema = require('../schema.js');
const fs = require('fs');
const typePath = '../src/db/types/';

module.exports = ({ title, data }) => new Promise((resolve, reject) => {
  const result = schema.get(title);
  if (!result) reject({ message: `Type ${title} does not exist!` });
  fs.writeFile(`${typePath}${title}.json`, JSON.stringify(data), (err) => {
    if (err) reject(err);
    schema.load();
    resolve('ok');
  });
});
