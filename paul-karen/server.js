'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// The purpose of the public directory, and using it as the argument to the static() method, is to allow us to serve static files (html, js, and images). By specifying these files in their own directory, and making it the "root" directory, we can let users access these files via the address bar, and the paths will be relative from where ever we define as the "root".
app.use(express.static('./public'));

app.get('/new', (request, response) => {
  response.sendFile('/new.html', {root: './public'});
});

app.get('*', (request, response) => {
  response.status(404).send('Error 404');
});

// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', express.urlencoded({extended:true}), (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

app.listen(PORT, () => console.log(`listening on: ${PORT}`));