var express = require("express");
var hbs = require("express-handlebars");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var config = require("./config");
// for encoding and decoding functions
var base58 = require("./base58.js");
// //grabs URL model
// var Url = require("./connection/url");
// for correctly concatenating our paths
var path = require('path');

var Counter = mongoose.model("Counter");
var Url = mongoose.model("Url");

var app = express();

// handles JSON bodies
app.use(parser.json());
// handles URL encoded bodies
app.use(parser.urlencoded({ extended: true }));

app.use("/assets", express.static("public"));

app.set("view engine", "hbs");

app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "views/",
  layoutsDir:     "views/",
  defaultLayout:  "layout-main"
}));

app.get("/", function(req, res){
  // res.render("Werkin' for the weekend");
  Url.find({}).then(function(response){
    res.render("url-index", {
      url: response
    });
  });
});

// route to redirect the visitor to their original URL given the short URL
app.get("/:encoded_id", function(req, res){
  var base58Id = req.params.encoded_id;
  var id = base58.decode(base58Id);

  //checks if the URL already exists in db
Url.findOne({_id: id}, function(err, doc){
  if (doc){
    res.redirect(doc.long_url);
  }else{
    res.redirect(config.webhost);
  }
});
});

// route to create and return a shortened URL given a long URL
app.post("/api/shorten", function(req, res){
  var longUrl = req.body.url;
  var shortUrl = "";
  // check if url already exists in database
  Url.findOne({long_url: longUrl}, function(err, doc){
    if(doc){
      // URL has already been shortened, so base58 encodes the unique _id of that document and construct the short URL
      shortUrl = config.webhost + base58.encode(doc._id);
      // since the URL exists, returns it without creating a new entry
      res.send({"shortUrl": shortUrl});
    }else {
      // creates a new entry
      var newUrl = Url({
        long_url: longUrl
      });
      // saves the new link
      newUrl.save(function(err, doc){
        if(err){
          console.log(err);
        }
        // construct the short URL
        shortUrl = config.webhost + base58.encode(newUrl._id);
        res.send({"shortUrl": shortUrl});
      });
    }
  });
 });




 // app.get("/:url", function(req, res){
 //   Url.findOne({name: req.params.name}).then(function(response){
 //     res.render("url-show", {
 //        // variable in view: value of the variable in the db
 //        url: response
 //     });
 //   });
 // });

// app.post("/:url", function(req, res){
//   Thing.findOneAndUpdate(req.params, req.body.url, {new: true}.then(function(response){
//     res.render
//   }))
// }

app.listen(3001, function(){
  console.log("Here we go, Steelers, here we go!");
});
