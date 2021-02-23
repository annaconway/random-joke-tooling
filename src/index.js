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
  '/default-styles.css': htmlHandler.getCSS,
  notFound: htmlHandler.get404Response,
};

// When program loads...
const onRequest = (request, response) => {
  const parseURL = url.parse(request.url);
  const { pathname } = parseURL;

  const params = query.parse(parseURL.query);
  const { limit } = params;

  const httpMethod = request.method;

  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (urlStruct[pathname]) {
    urlStruct[pathname](request, response, limit, acceptedTypes, httpMethod);
  } else {
    urlStruct.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
