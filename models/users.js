const mongoose = require("mongoose");
const conn = require("./databaseconn").conn;
const Schema = new mongoose.Schema({
    "userId":Number,
    "userName":String,
    "isActive":Boolean,
});
module.exports = conn.model("users", Schema);
