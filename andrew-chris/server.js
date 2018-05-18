'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.get('/newArticle', (request, response) => {
  response.sendFile('/new.html', {root: './public'});

});
// REVIEW: POST route needs to parse the body passed in with the request. express.urlencoded() attaches "middleware" to do that
app.post('/articles', bodyParser.urlencoded({extended: true}), (request, response) => {
  // REVIEW: This route will receive a new article from the form page, new.html, and log that form data to the console. We will wire this up soon to actually write a record to our persistence layer!
  console.log(request.body);
  response.status(201).json(request.body);
})
app.get('*', (req, res) => {
res.status(404).send('error 404');
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));

