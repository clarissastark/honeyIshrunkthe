var mongoose = require("mongoose");

var UrlSchema = {
  long_url: String,
  short_url: String
};

mongoose.model("Url", UrlSchema);

mongoose.connect("mongodb://localhost/url");

module.exports = mongoose;
