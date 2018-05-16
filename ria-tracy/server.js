'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();
const ROOT ={root:'public'};


// public directory holds all the files requierd for the websites and app.use() called below  tells express where to find them.When express gets request for files it fills them from the public folder.
app.use(express.static('public'));

app.get('/new',(req, res)=>{
  res.sendFile('new.html',ROOT);
});
// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', express.urlencoded(), (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

// COMMENT: This is the catch-all function that response with
// status 404 and a message in the browser if the user requests
// a non-existant resource.
app.use((req, res) => {
  console.log('Catch-all error handler triggered');
  res.status(404).send('Error 404: File not found.');
});

// COMMENT: Everything setup. Now start listening...
app.listen(PORT,() =>console.log(`listening to:${PORT}`));