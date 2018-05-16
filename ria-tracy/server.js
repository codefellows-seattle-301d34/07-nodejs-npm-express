'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();


// public directory holds all the files requierd for the websites and app.use() called below  tells express where to find them.When express gets request for files it fills them from the public folder.
app.use(express.static('./public'));
// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', express.urlencoded(), (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});
app.listen(PORT,() =>console.log(`listening to:${PORT}`));