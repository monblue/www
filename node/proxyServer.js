var httpProxy = require('http-proxy')

var proxy = httpProxy.createProxy();

var options = {
  //'blog.moonhani.com': 'http://127.0.0.1:4000',  // 'http://'가 없으면 error 발생@@@@
  //'blog.moonhani.com': 'http://0.0.0.0:4000',	//hexo
  //'blog.moonhani.com': 'http://127.0.0.1:4000',	//hexo
  'blog.moonhani.com': 'http://127.0.0.1:2368', 	//ghost
  'blog.moonhani.com': 'http://0.0.0.0:2368',  //ghost
  'www.moonhani.com': 'http://127.0.0.1:4343',  //express
  //'book.moonhani.com': 'http://www.moonhani.com/book'  // 서브 디렉토리는 작동안함@@@
  //'book.moonhani.com': 'http://127.0.0.1:4343/book'  // 서브 디렉토리는 작동안함@@@
}

require('http').createServer(function(req, res) {
  proxy.web(req, res, {
    target: options[req.headers.host]
  });
}).listen(80);
