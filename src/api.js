'use strict';

const fs = require('fs');
const path = require('path');

const apiMap = new Map();
const api = {};
const apiPath = './api/';

/*
  Загружает в apiMap все api что есть на сервере
  где:
    key - наименование метода
    value - метод
*/
api.load = () => {
  fs.readdir(apiPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((name) => {
      const fullFilePath = require.resolve(apiPath + name);
      const key = path.basename(apiPath + name, '.js');
      delete require.cache[fullFilePath];
      apiMap.delete(key);
      try {
        const typeObject = require(apiPath + name);
        apiMap.set(key, typeObject);
      } catch (e) {
        console.error(e);
        apiMap.delete(key);
        return;
      }
    });
  });
  return api;
};

api.get = (name) => apiMap.get(name);

api.getAllKeys = () => [...apiMap.keys()];

module.exports = api;
