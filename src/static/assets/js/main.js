'use strict';

const buildApi = (methods) => {
  const api = {};
  methods.forEach((method) => {
    api[method] = (payload) => fetch(`/api/${method}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((result) => result)
      .catch(console.error);
  });
  return api;
};

const prepareQuery = () => {
  const result = {};
  const queryParams = document.location.search
    .substring(1)
    .split('&')
    .filter(el => el);
  queryParams.forEach((item) => {
    const [ key, value ] = item.split('=');
    result[key] = value;
  });
  return result;
};

const api = buildApi([
  'createType', 'getAllTypes', 'getTypeByName',
  'updateType', 'createEntity', 'getEntyties',
  'getEntity', 'updateEntity'
]);

console.log(Object.keys(api));

