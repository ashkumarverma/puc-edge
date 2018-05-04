var MongoClient = require('mongodb').MongoClient;
//Create a database named "mydb":
//var url = "mongodb+srv://denakv:a25071982))@cluster0-o1xb4.mongodb.net";
var url = "mongodb://27017/loginapp";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});