'use strict';

const fs = require('fs');
const path = require('path');

const schemaMap = new Map();
const schema = {};
const typesPath = './db/types/';

/*
  Загружает в schemaMap все schemaType что есть на сервере
  где:
    key - наименование схемы
    value - объект схемы
*/
schema.load = () => {
  fs.readdir(typesPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((name) => {
      const fullFilePath = require.resolve(typesPath + name);
      const key = path.basename(typesPath + name, '.json');
      delete require.cache[fullFilePath];
      schemaMap.delete(key);
      try {
        const typeObject = require(typesPath + name);
        schemaMap.set(key, typeObject);
      } catch (e) {
        console.error(e);
        schemaMap.delete(key);
        return;
      }
    });
  });
};

schema.get = (name) => schemaMap.get(name);

schema.getAllKeys = () => [...schemaMap.keys()];

module.exports = schema;
