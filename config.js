var config = {};

config.db = {};
// the URL shortening host - shortened URLs will be this + base58 ID
config.webhost = "http://localhost:3001";

// your MongoDB host and database name
config.db.host = "localhost";
config.db.name = "url_shortener";

module.exports = config;
