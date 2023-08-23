const mongoose = require("mongoose");
const conn = require("./databaseconn").conn;
const Schema = new mongoose.Schema({
  roomId: Number,
  roomName: String,
  buildingDetails: Object,
});
module.exports = conn.model("room", Schema);
