// CALL UNDERSCORE FOR SHUFFLING
const _ = require('underscore');

// JOKE ARRAY
const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think theyll fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I didnt know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
];

// GET JOKES JSON
const getRandomJokeJSON = (num) => {
  // Assure num is a number & validate it
  let limit = Number(num);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > jokes.length ? jokes.length : limit;

  // Shuffle array of jokes
  const shuffleJokes = _.shuffle(jokes);
  const tempJokes = [];

  // Fill new array using limit
  for (let i = 0; i < limit; i += 1) {
    tempJokes[i] = shuffleJokes[i];
  }

  // Return joke array
  return JSON.stringify(tempJokes);
};

// GET JOKES XML
const getRandomJokeXML = (num) => {
  // Assure num is a number & validate it
  let limit = Number(num);
  limit = !limit ? 1 : limit;
  limit = limit < 1 ? 1 : limit;
  limit = limit > jokes.length ? jokes.length : limit;

  // Shuffle array of jokes
  const shuffleJokes = _.shuffle(jokes);
  const tempJokes = [];

  // Fill new array using limit
  for (let i = 0; i < limit; i += 1) {
    tempJokes[i] = `<joke><q>${shuffleJokes[i].q}</q><a>${shuffleJokes[i].a}</a></joke>`;
  }

  // Return first joke 
  if (limit === 1) return tempJokes[0];

  // Return joke array
  return `<jokes>${tempJokes}</jokes>`;
};

// SEND RESPONSE TO THE SERVER
const getRandomJokeResponse = (request, response, params , acceptedTypes, httpMethod) => {
    // XML Data
    if (acceptedTypes.includes('text/xml')) {
    response.writeHead(200, { 'Content-Type': 'text/xml' });
    response.write(getRandomJokeXML(params));
    response.end();
    // JSON Data
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' }); // send response headers
    response.write(getRandomJokeJSON(params));
    response.end();
  }
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
