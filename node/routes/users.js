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
db = new Db('mHdb', server, {safe: true});
//db = new Db('mHdb', server);

db.open(function(err, db) {
    if(!err) {
        //console.log("Connected to 'mHdb' database");
        db.collection('user', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'user' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});
/*
exports.findById = function(req, res) {
    var id = req.params.id;
    //console.log('Retrieving user: ' + id);
    db.collection('user', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};
*/
exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('users', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            //res.jsonp(item);
            res.send(item);
        });
    });
};


exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('users', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                //res.jsonp(items);
                res.send(item);
            });
        }
    });
};

/*
exports.findByQuery = function(req, res) {
  var filter = new RegExp(req.query.keyword, '');
  db.collection('user', function(err, collection) {
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
*/

exports.adduser = function(req, res) {
    var user = req.body;
    console.log('Adding user: ' + JSON.stringify(user));
    db.collection('user', function(err, collection) {
        collection.insert(user, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateuser = function(req, res) {
    var id = req.params.id;
    var user = req.body;
    delete user._id;
    console.log('Updating user: ' + id);
    console.log(JSON.stringify(user));
    db.collection('user', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, user, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating user: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(user);
            }
        });
    });
}

exports.deleteuser = function(req, res) {
    var id = req.params.id;
    console.log('Deleting user: ' + id);
    db.collection('user', function(err, collection) {
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

//mongoimport --db mHdb --collection users --file C:/APM_Setup/htdocs/nodecellar/users1.json --jsonArray
//동의보감
//mongoimport --db mHdb --collection user --file C:\APM_Setup\htdocs\user\api\_user\file\user6.json --jsonArray
/*
> db.user.distinct('h1')
[ "內景篇", "外形篇", "雜病篇", "湯液篇", "鍼灸篇" ]

> db.user.distinct('h2', {h1:"內景篇"})
[ "內景篇·卷之一", "內景篇·卷之二", "內景篇·卷之三", "內景篇·卷之四" ]

> db.user.distinct('h3', {h2:"內景篇·卷之一"})
[ "身形", "神部", "#0230精部", "#0245氣部" ]
*/
};


/*

var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    db;

var mongoClient = new MongoClient(new Server('localhost', 27017));
mongoClient.open(function(err, mongoClient) {
    db = mongoClient.db("employeedb09");
    db.collection('employees', {strict:true}, function(err, collection) {
        if (err) {
            console.log("The 'employees' collection doesn't exist. Creating it with sample data...");
            populateDB();
        }
    });
});


exports.findById = function(req, res) {
    console.log(req.params);
    var id = parseInt(req.params.id);
    console.log('findById: ' + id);
    db.collection('employees', function(err, collection) {
        collection.findOne({'id': id}, function(err, item) {
            console.log(item);
            res.jsonp(item);
        });
    });
};

exports.findByManager = function(req, res) {
    var id = parseInt(req.params.id);
    console.log('findByManager: ' + id);
    db.collection('employees', function(err, collection) {
        collection.find({'managerId': id}).toArray(function(err, items) {
            console.log(items);
            res.jsonp(items);
        });
    });
};

exports.findAll = function(req, res) {
    var name = req.query["name"];
    db.collection('employees', function(err, collection) {
        if (name) {
            collection.find({"fullName": new RegExp(name, "i")}).toArray(function(err, items) {
                res.jsonp(items);
            });
        } else {
            collection.find().toArray(function(err, items) {
                res.jsonp(items);
            });
        }
    });
};

var populateDB = function() {

    console.log("Populating employee database...");
    var employees = [
        {"id": 1, "firstName": "James", "lastName": "King", "fullName": "James King", "managerId": 0, managerName: "", "title": "President and CEO", "department": "Corporate", "cellPhone": "617-000-0001", "officePhone": "781-000-0001", "email": "jking@fakemail.com", "city": "Boston, MA", "pic": "james_king.jpg", "twitterId": "@fakejking", "blog": "http://coenraets.org"},
        {"id": 2, "firstName": "Julie", "lastName": "Taylor", "fullName": "Julie Taylor", "managerId": 1, managerName: "James King", "title": "VP of Marketing", "department": "Marketing", "cellPhone": "617-000-0002", "officePhone": "781-000-0002", "email": "jtaylor@fakemail.com", "city": "Boston, MA", "pic": "julie_taylor.jpg", "twitterId": "@fakejtaylor", "blog": "http://coenraets.org"},
        {"id": 3, "firstName": "Eugene", "lastName": "Lee", "fullName": "Eugene Lee", "managerId": 1, managerName: "James King", "title": "CFO", "department": "Accounting", "cellPhone": "617-000-0003", "officePhone": "781-000-0003", "email": "elee@fakemail.com", "city": "Boston, MA", "pic": "eugene_lee.jpg", "twitterId": "@fakeelee", "blog": "http://coenraets.org"},
        {"id": 4, "firstName": "John", "lastName": "Williams", "fullName": "John Williams", "managerId": 1, managerName: "James King", "title": "VP of Engineering", "department": "Engineering", "cellPhone": "617-000-0004", "officePhone": "781-000-0004", "email": "jwilliams@fakemail.com", "city": "Boston, MA", "pic": "john_williams.jpg", "twitterId": "@fakejwilliams", "blog": "http://coenraets.org"},
        {"id": 5, "firstName": "Ray", "lastName": "Moore", "fullName": "Ray Moore", "managerId": 1, managerName: "James King", "title": "VP of Sales", "department": "Sales", "cellPhone": "617-000-0005", "officePhone": "781-000-0005", "email": "rmoore@fakemail.com", "city": "Boston, MA", "pic": "ray_moore.jpg", "twitterId": "@fakermoore", "blog": "http://coenraets.org"},
        {"id": 6, "firstName": "Paul", "lastName": "Jones", "fullName": "Paul Jones", "managerId": 4, managerName: "John Williams", "title": "QA Manager", "department": "Engineering", "cellPhone": "617-000-0006", "officePhone": "781-000-0006", "email": "pjones@fakemail.com", "city": "Boston, MA", "pic": "paul_jones.jpg", "twitterId": "@fakepjones", "blog": "http://coenraets.org"},
        {"id": 7, "firstName": "Paula", "lastName": "Gates", "fullName": "Paula Gates", "managerId": 4, managerName: "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0007", "officePhone": "781-000-0007", "email": "pgates@fakemail.com", "city": "Boston, MA", "pic": "paula_gates.jpg", "twitterId": "@fakepgates", "blog": "http://coenraets.org"},
        {"id": 8, "firstName": "Lisa", "lastName": "Wong", "fullName": "Lisa Wong", "managerId": 2, managerName: "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0008", "officePhone": "781-000-0008", "email": "lwong@fakemail.com", "city": "Boston, MA", "pic": "lisa_wong.jpg", "twitterId": "@fakelwong", "blog": "http://coenraets.org"},
        {"id": 9, "firstName": "Gary", "lastName": "Donovan", "fullName": "Gary Donovan", "managerId": 2, managerName: "Julie Taylor", "title": "Marketing Manager", "department": "Marketing", "cellPhone": "617-000-0009", "officePhone": "781-000-0009", "email": "gdonovan@fakemail.com", "city": "Boston, MA", "pic": "gary_donovan.jpg", "twitterId": "@fakegdonovan", "blog": "http://coenraets.org"},
        {"id": 10, "firstName": "Kathleen", "lastName": "Byrne", "fullName": "Kathleen Byrne", "managerId": 5, managerName: "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0010", "officePhone": "781-000-0010", "email": "kbyrne@fakemail.com", "city": "Boston, MA", "pic": "kathleen_byrne.jpg", "twitterId": "@fakekbyrne", "blog": "http://coenraets.org"},
        {"id": 11, "firstName": "Amy", "lastName": "Jones", "fullName": "Amy Jones", "managerId": 5, managerName: "Ray Moore", "title": "Sales Representative", "department": "Sales", "cellPhone": "617-000-0011", "officePhone": "781-000-0011", "email": "ajones@fakemail.com", "city": "Boston, MA", "pic": "amy_jones.jpg", "twitterId": "@fakeajones", "blog": "http://coenraets.org"},
        {"id": 12, "firstName": "Steven", "lastName": "Wells", "fullName": "Steven Wells", "managerId": 4, managerName: "John Williams", "title": "Software Architect", "department": "Engineering", "cellPhone": "617-000-0012", "officePhone": "781-000-0012", "email": "swells@fakemail.com", "city": "Boston, MA", "pic": "steven_wells.jpg", "twitterId": "@fakeswells", "blog": "http://coenraets.org"}
    ];

    db.collection('employees', function(err, collection) {
        collection.insert(employees, {safe:true}, function(err, result) {});
    });

};

*/