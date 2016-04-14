var express = require("express");
var hbs = require("express-handlebars");
var parser = require("body-parser");
var mongoose = require("./db/connection");
var app = express();

var Url = mongoose.model("Url");

// angular uses json: app.use(parser.json
app.use(parser.urlencoded({extended: true}));
app.set("view engine", "hbs");

app.engine(".hbs", hbs({
  extname:        ".hbs",
  partialsDir:    "/views",
  layoutsDir:     "/views",
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

app.get("/:encoded_id", function(req, res){
   // route to redirect the visitor to their original URL given the short URL
});

app.post("/api/shorten", function(req, res){
   // route to create and return a shortened URL given a long URL
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
