////////////////////////////////////////////////
// blogServer.js
var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
//var book = require('./routes/books');

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


http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
