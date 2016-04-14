// can't require "mongoose" because it's already required somewhere else

var mongoose = require("./connection");
var seedData = require("./seeds/");
var Url = mongoose.model("Url");

Url.remove().then(function(){
  Url.create(seedData).then(function(){
    process.exit();
  });
});
