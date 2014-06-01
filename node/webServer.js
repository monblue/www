////////////////////////////////////////////////
// blogServer.js
var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var book = require('./routes/books');

var user = require('./routes/users');		//login, signup, cookie...

var app = express();

app.configure(function () {
    app.set('port', process.env.PORT || 4343);
    app.use(express.logger('dev'));  // 'default', 'short', 'tiny', 'dev'
    app.use(express.bodyParser());
    //virtual directories
    //app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.static('/home/git/www'));
    //app.use('/blog', express.static('/home/git/www/hexo/public'));
    //app.use(express.static('D:\\dev\\moonHani\\www'));
    //app.use(express.static('C:\\APM_Setup\\htdocs'));
    //app.use('/photo', express.static('D:\\SOM_Photo'));
    //app.use('/app', app.router);
});

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/', function(req, res) {
  fs.readFile('index.html', function(err,data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    //res.end(data);
    res.send(data);
  });
});


app.get('/blog/', function(req, res) {
  //res.redirect('http://moonhani.github.io/');
  //res.location('blog');
  //window.location = '/blog2'
  res.redirect('http://www.moonhani.com:4000/');
});

//book api router
app.get('/books', book.findAll);
app.get('/books/:id', book.findById);
app.post('/books', book.addbook);
app.put('/books/:id', book.updatebook);
app.delete('/books/:id', book.deletebook);

app.get('/search', book.findByQuery);
app.post('/findByTitle', book.findByTitle);



//userServer
app.get('/users', user.findAll);
app.get('/users/:id', user.findById);
app.post('/users', user.adduser);
app.put('/users/:id', user.updateuser);
app.delete('/users/:id', user.deleteuser);

//app.get('/search', user.findByQuery);
//app.post('/findByTitle', user.findByTitle);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
