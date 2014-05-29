////////////////////////////////////////////////
// bookServer.js
var express = require('express');
var path = require('path');
var http = require('http');
var book = require('./routes/books');

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 3333);
    app.use(express.logger('dev'));  // 'default', 'short', 'tiny', 'dev'
    app.use(express.bodyParser());
    //app.use(express.static(path.join(__dirname, 'public')));
});

// Enabling Cross Domain @@@@@@@added by Moon(ref: https://github.com/fernandoperigolo/nodejs-crud/blob/master/app.js)
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/books', book.findAll);
app.get('/books/:id', book.findById);
app.post('/books', book.addbook);
app.put('/books/:id', book.updatebook);
app.delete('/books/:id', book.deletebook);

app.get('/search', book.findByQuery);
app.post('/findByTitle', book.findByTitle);


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});