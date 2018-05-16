'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('./public'));
//Comment: Files are in a public directory so that they are seperate from the view they are in the backend. The files are served by expressJS to deliver those files to the client side from the backend.
app.get('/message', (request, response) => {
  response.send('<h4>The Port the server is running is PORT 3000.</h4>');
  console.log('This will show up in the terminal.');
});

// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', express.urlencoded(), (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));