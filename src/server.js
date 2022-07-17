'use strict';

const fs = require('fs');
const http = require('http');

require('./schema').load();
const api = require('./api').load();

const PORT = 8001;
const HOSTNAME = 'localhost';

const httpResult = (
  res, status = 200, payload = 'OK', contentType = 'text/html') => {
  res.setHeader('Content-Type', contentType);
  res.statusCode = status;
  res.end(payload);
};

const getFileNameFromUrl = (url) => (
  url === '/' ? 'index.html' : url.substring(1).split('?')[0]
);

const getMethodNameFromUrl = (url) => {
  const [ methodName ] = url
    .substring(1)
    .trim()
    .split('/')
    .filter((s) => s !== 'api');
  return methodName;
};

const receiveArgs = async (req) => {
  const buffers = [];
  for await (const chunk of req) buffers.push(chunk);
  const data = Buffer.concat(buffers).toString();
  if (!data.trim()) return [];
  return JSON.parse(data);
};

const getFilePath = (fileName) => {
  if (fileName.indexOf('.html') >= 0) {
    return `./static/templates/${fileName}`;
  } else if (fileName.indexOf('.css') >= 0) {
    return `./static/assets/css/${fileName}`;
  } else if (fileName.indexOf('.js') >= 0) {
    return `./static/assets/js/${fileName}`;
  } else {
    return fileName;
  }
};

const server = http.createServer(async (req, res) => {
  if (req.url.indexOf('api') >= 0) {
    const methodName = getMethodNameFromUrl(req.url);
    const method = api.get(methodName);
    if (!method) {
      httpResult(res, 404, `Method ${methodName} not found`);
      return;
    }
    const args = await receiveArgs(req);
    method(args)
      .then(
        (result) => {
          httpResult(res, 200, JSON.stringify(result), 'application/json');
        },
        (err) => {
          httpResult(res, 400, err.message);
        }
      );
  } else {
    const fileName = getFileNameFromUrl(req.url);
    const filePath = getFilePath(fileName);
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        httpResult(res, 404, 'Not found');
        return;
      }
      let conrtentType = 'text/html';
      if (fileName.indexOf('css') >= 0) conrtentType = 'text/css';
      else if (fileName.indexOf('js') >= 0) conrtentType = 'text/js';
      httpResult(res, 200, data, conrtentType);
    });
  }
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server connect on http://${HOSTNAME}:${PORT}`);
});
