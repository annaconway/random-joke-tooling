// Pull in modules
const http = require('http');
const url = require('url');

// Set up port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Create Error Page
const errorPage = `
<html>
  <head>
    <title>404 - File Not Found!</title>
  </head>
  <body>
    <h1>404 - File Not Found!</h1>
    <p>Check your URL, or your typing!!</p>
    <p>>:-O</p>
  </body>
</html>`;

// Joke Array
let jokes = [
  {q:"What do you call a very small valentine?",                         a:"A valen-tiny!"},
  {q:"What did the dog say when he rubbed his tail on the sandpaper?",   a:"Ruff, Ruff!"},
  {q:"Why don't sharks like to eat clowns?",                             a:"Because they taste funny!"},
  {q:"What did the boy cat say to the girl cat?",                        a:"You're Purr-fect!"},
  {q:"What is a frog's favorite outdoor sport?",                         a:"Fly Fishing!"},
  {q:"I hate jokes about German sausages.",                              a:"Theyre the wurst."},
  {q:"Did you hear about the cheese factory that exploded in France?",   a:"There was nothing left but de Brie."},
  {q:"Our wedding was so beautiful ",                                    a:"Even the cake was in tiers."},
  {q:"Is this pool safe for diving?",                                    a:"It deep ends."},
  {q:"Dad, can you put my shoes on?",                                    a:"I dont think theyll fit me."},
  {q:"Can February March?",                                              a:"No, but April May"},
  {q:"What lies at the bottom of the ocean and twitches?",               a:"A nervous wreck."},
  {q:"Im reading a book on the history of glue.",                        a:"I just cant seem to put it down."},
  {q:"Dad, can you put the cat out?",                                    a:"I didnt know it was on fire."},
  {q:"What did the ocean say to the sailboat?",                          a:"Nothing, it just waved."},
  {q:"What do you get when you cross a snowman with a vampire?",         a:"Frostbite"}
];


// Get jokes
const getRandomJokeJSON = (numberOfJokes) => {
  const number = Math.floor(Math.random() * 10);
  return JSON.stringify(jokes[number]);
}

// When program loads...
const onRequest = (request, response) => {
const parseURL = url.parse(request.url);
const pathname = parseURL.pathname;
console.log("parsedUrl=", parseURL);
console.log("pathname=", pathname);

if(pathname == "/random-joke"){
    response.writeHead(200, { 'Content-Type': 'text/html'});
    response.write(getRandomJokeJSON(jokes.length));
    response.end();
}
else{
    response.writeHead(404, { 'Content-Type': 'text/html'});
    response.write(errorPage);
    response.end();
}
 
};


// 8 - create the server, hook up the request handling function, and start listening on `port`
http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);