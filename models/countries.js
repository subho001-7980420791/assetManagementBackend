const mongoose = require("mongoose");
const conn = require("./databaseconn").conn;
const Schema = new mongoose.Schema({
    "countryId":Number,
    "countryName":String,
    "isActive":Boolean,
});
module.exports = conn.model("countries", Schema);
