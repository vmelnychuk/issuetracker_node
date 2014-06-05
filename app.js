var express = require("express"),
  cons = require("consolidate"),
  MongoClient = require("mongodb").MongoClient,
  MongoServer = require("mongodb").Server,
  app = express();

var mongoclient = new MongoClient(new MongoServer("localhost", 27017, {"native_parser": true}));
var db = mongoclient.db("tracker");

app.engine("html", cons.swig);
app.set("view engine", 'html');
app.set("views", __dirname + "/views");

app.get("/", function(req, res) {
  db.collection("hello_collection").findOne({}, function(err, doc){
    if (err) throw err;
    //assume that doc = {"name": "some-name"}
    res.render("hello", doc);
  });
});

app.get("*", function(req, res) {
  res.send("Page not Found", 404);
});

//open the db connection
mongoclient.open(function(err, mongoclient){
  if (err) throw err;
  app.listen(9090);
  console.log("Express App is running on http://localhost:9090");
});
