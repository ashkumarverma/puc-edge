var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
var uri = "mongodb+srv://denakv:a25071982))@cluster0-o1xb4.mongodb.net/test";

MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});