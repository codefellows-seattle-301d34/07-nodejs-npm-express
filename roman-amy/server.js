'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
//Comment
app.use(express.static('./public'));


app.get('/new', (request, response) =>{
  console.log('in /new')
  response.sendFile('/public/new.html',{
    root:'.'});
});


// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', bodyParser.urlencoded({exteded: true}), (request, response) => {

  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
})

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
