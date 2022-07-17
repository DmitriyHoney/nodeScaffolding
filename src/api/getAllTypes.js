'use strict';

const schema = require('../schema.js');

module.exports = () => Promise.resolve(schema.getAllKeys());
