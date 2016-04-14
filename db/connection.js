var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var config = require("../config");

var CounterSchema = Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

var counter = mongoose.model("Counter", CounterSchema);

var UrlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});

// mongoose.model("Counter", CounterSchema);
mongoose.model("Url", UrlSchema);

UrlSchema.pre("save", function(next){
  var doc = this;
    // find the url_count and increment it by 1
  counter.findByIdAndUpdate({_id: "url_count"}, {$inc: {seq: 1}}, function(err, counter){
    if (err)
      return next(err);
    // set the _id of the urls collection to the incremented value of the counter
    doc._id = counter.seq;
    doc.created_at = new Date();
    next();
  });
});

var Url = mongoose.model("Url", UrlSchema);

// for deploying for production
if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGOLAB_URL);
}else{
  mongoose.connect("mongodb://localhost/url_shortener");
}

// create a connection to our MongoDB
// mongoose.connect("mongodb://" + config.db.host + "/" + config.db.name);
// mongoose.connect("mongodb://localhost/url_shortener");

module.exports = mongoose;
module.exports = Url;
