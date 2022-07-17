'use strict';

const schema = require('../schema.js');

module.exports = ({ name }) => new Promise((resolve, reject) => {
  const result = schema.get(name);
  if (!result) reject({ error: `Schema type ${name} not found!` });
  resolve(result);
});
