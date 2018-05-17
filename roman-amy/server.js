'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3000;
//Comment: explain why our files are in a "public" directory now and how ExpressJS serves our local files.
//all of our front-end files are in the public folder to keep it separate from the server-side which normally would happen when using a database. You cannot run two servers from the same directory.
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
app.get('*', (request, response) => {
  response.status(404).send(`Route does not exist.`);
})

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
