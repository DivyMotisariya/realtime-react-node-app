const mongoose = require("mongoose");
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once("open", () => console.log("Database Connected"));

module.exports = db;
