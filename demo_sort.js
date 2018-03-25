var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://denakv:a25071982))@cluster0-o1xb4.mongodb.net";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  var mysort = { name: 1 };
  dbo.collection("customers").find().sort(mysort).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});