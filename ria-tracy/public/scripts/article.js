'use strict';

function Article (rawDataObj) {
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.body = rawDataObj.body;
  this.publishedOn = rawDataObj.publishedOn;
}

Article.all = [];

Article.prototype.toHtml = function() {
  let template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? `published ${this.daysAgo} days ago` : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

Article.loadAll = articleData => {
  articleData.sort((a,b) => (new Date(b.publishedOn)) - (new Date(a.publishedOn)))

  articleData.forEach(articleObject => Article.all.push(new Article(articleObject)))
}

Article.fetchAll = () => {
  if (localStorage.rawData) {
    Article.loadAll(JSON.parse(localStorage.rawData));
    articleView.initIndexPage();
  } else {
    $.getJSON('/data/hackerIpsum.json')
      .then(data => {
        Article.loadAll(data);
        localStorage.rawData = JSON.stringify(data);
        articleView.initIndexPage();
      }, err => {
        console.error(err);
      });
  }
}

// REVIEW: This new prototype method on the Article object constructor will allow us to create a new article from the new.html form page, and submit that data to the back-end. We will see this log out to the server in our terminal!
// COMMENT: I didn't like the brittleness of the original code
// so I replaced it with a more dynamic equivalent.
// Originally I tried just passing "this" to $.post but that
// resulted in very strange behavior, apparently related to the
// presence of prototype methods on the object. By passing the
// object through stringify and parse we get back a generic
// object with all Article's properties but none of its 
// inheritance/prototypes.
Article.prototype.insertRecord = function(callback) {
  $.post('/articles', JSON.parse(JSON.stringify(this)))
    .then(data => {
      console.log(data);

      // COMMENT: What is the purpose of this line? Is the callback invoked when this method is called? Why or why not?
      // This line invokes the callback function that is an 
      // optional parameter to the insertRecord method. Since
      // no callback was provided when we invoked insertRecord
      // this line won't do anything.
      if (callback) callback();
    })
};
