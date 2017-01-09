var mongoClient = require("mongodb").MongoClient;

var url = 'mongodb://localhost:27017/test';
var self = require("./db")




exports.insertDocument = function(doc,callback) {
	mongoClient.connect(url, function(err, db) {
   db.collection('bot_users').insertOne(doc, function(err, result) {
    callback();
  });
});
};


exports.findDocument = function (query,callback) {
	// var data
	mongoClient.connect(url, function(err, db) {
	var cursor =db.collection('bot_users').findOne(query,function (err,document) {
		console.log(document)
		callback(document)
	});
	})
}


// testing

// self.findDocument({},function (data) {
// 	console.log(data)

// })