'use strict';

const express = require('express');
const PORT = process.env.PORT || 3000;

const app = express();

//TELL THE SERVER
app.use(express.static('./public'));

//setup a rout message
app.get('/new' , (request, response) => {
  response.sendFile('new.html', {root: './public'});
});




// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', express.urlencoded(), (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
});

app.get('*', function(req, res){
  res.send('File not found', 404);
});



//start the app so it listens for changes
app.listen(PORT, () => console.log(`Listening on: ${PORT} `));