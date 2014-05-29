var mongo = require('mongodb');
//var mongo = require('mongo-sync');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
/*
//sync 설치후 테스트@@@@@@@@@@@@@
//npm install mongo-sync
//npm install fibers

var Server = require("mongo-sync").Server;
var server = new Server('127.0.0.1');
var result = server.db("testdb").getCollection("testCollection").find().toArray();
console.log(result);
*/

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('bookdb', server, {safe: true});
//db = new Db('bookdb', server);

db.open(function(err, db) {
    if(!err) {
        //console.log("Connected to 'bookdb' database");
        db.collection('donggam', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'donggam' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    //console.log('Retrieving book: ' + id);
    db.collection('donggam', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('donggam', function(err, collection) {
      collection.findOne({_t:/기혈/}, function(err, item) {
          res.send(item);
          //console.log('rs:' + item._t[0].t);  //title
          var len = item._t.length;
          for(var i=0;i<len;i++) {
            if (typeof(item._t[i]) == 'object' && item._t[i].n) {
              console.log('note: ' + item._t[i].n);
            }
          }
          /*
          forEach(item._t, function(k, v) {
            if (v.t) {
              console.log('rs title : ' + v.t);
              return;
            }
          });
          */
      });
    });

};

exports.findByQuery = function(req, res) {
  var filter = new RegExp(req.query.keyword, '');
  db.collection('donggam', function(err, collection) {
    collection.find({$or:[{_t:{$elemMatch:{t:filter}}},{_t:filter},{_o:filter}]}, {_t:1}).toArray(function(err, docs) {
      var items = [];
      var len = docs.length;
      for (var i=0;i<len;i++) {
        console.log(docs[i]._t[0].t);
        items.push({id:docs[i]._id, tt:docs[i]._t[0].t});
      }
      res.send(items);
      //res.send(docs);
    });
  });
};

//@@@@@@@@@@ $in(array select)
exports.findByTitle = function(req, res) {
  var tt = req.body.titles;
  if (tt) {
    var len = tt.length;

    var filters = [];
    for(var i=0;i<len;i++) {
    	filters.push(new RegExp(escapeText(tt[i]), ''));
    }
    console.log('escape test filters!!!', filters);

      db.collection('donggam', function(err, collection) {
          collection.find({_t:{$elemMatch:{t:{$in:filters}}}}).toArray(function(err, docs) {
              res.send(docs);
          });
      });

  }

};

exports.addbook = function(req, res) {
    var book = req.body;
    console.log('Adding book: ' + JSON.stringify(book));
    db.collection('donggam', function(err, collection) {
        collection.insert(book, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updatebook = function(req, res) {
    var id = req.params.id;
    var book = req.body;
    delete book._id;
    console.log('Updating book: ' + id);
    console.log(JSON.stringify(book));
    db.collection('donggam', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, book, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating book: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(book);
            }
        });
    });
}

exports.deletebook = function(req, res) {
    var id = req.params.id;
    console.log('Deleting book: ' + id);
    db.collection('donggam', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

var escapeText = function(word) {
	return word.replace('(', '\\(').replace(')', '\\)').replace('[', '\\[').replace(']', '\\]');
}

function delay(gap) { /* gap is in millisecs */
    var then,now;
    then = new Date().getTime();
    now = then;
    while((now - then) < gap) {
        now = new Date().getTime();
    }
}

var importDB = function() {

//mongoimport --db bookdb --collection books --file C:/APM_Setup/htdocs/nodecellar/books1.json --jsonArray
//동의보감
//mongoimport --db bookdb --collection donggam --file C:\APM_Setup\htdocs\book\api\_book\file\donggam6.json --jsonArray
/*
> db.donggam.distinct('h1')
[ "內景篇", "外形篇", "雜病篇", "湯液篇", "鍼灸篇" ]

> db.donggam.distinct('h2', {h1:"內景篇"})
[ "內景篇·卷之一", "內景篇·卷之二", "內景篇·卷之三", "內景篇·卷之四" ]

> db.donggam.distinct('h3', {h2:"內景篇·卷之一"})
[ "身形", "神部", "#0230精部", "#0245氣部" ]
*/
};