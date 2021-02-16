// Pull in modules
const http = require('http');
const url = require('url');
const query = require('querystring');

const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./responses.js');

// Set up port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Create urlStruct
const urlStruct = {
  '/random-joke': jsonHandler.getRandomJokeResponse,
  '/random-jokes': jsonHandler.getRandomJokeResponse,
  notFound: htmlHandler.get404Response,
};

// When program loads...
const onRequest = (request, response) => {
  const parseURL = url.parse(request.url);
  const { pathname } = parseURL;

  const params = query.parse(parseURL.query);
  const { limit } = params;

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  const httpMethod = request.method;

  // ALWAYS GIVE CREDIT - in your code comments and documentation
  // Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
  // Refactored to an arrow function by ACJ
  const getBinarySize = string => Buffer.byteLength(string, 'utf8');

  if (httpMethod === HEAD) {
    const getContentType = httpMethod.getHead;

  }

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, limit, acceptedTypes, httpMethod);
  } else if (urlStruct[pathname]) {
    urlStruct[pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};


// console.log(`Listening on 127.0.0.1: ${port}`);
