'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
//Comment: Files are in a public directory so that they are seperate from the view they are in the backend. The files are served by expressJS to deliver those files to the client side from the backend.
app.get('/message', (request, response) => {
  response.send('The Port the server is running is PORT 3000.');
  console.log('This will show up in the terminal.');
});

app.get('/new', (request, response) => {
  response.sendFile('/public/new.html', {root: '.'});
});

app.get('/index', (request, response) => {
  response.sendFile('/public/index.html', {root: '.'});
});

// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', express.urlencoded(), (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

// Create a 404 route to handle any requests other than index.html or new.html, and deliver a 404 status and a message to those invalid requests
app.get('/*', (request, response) => {
  response.send('This is a 404 message', 404);
  console.log('We just sent a 404 message.');
});

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));

