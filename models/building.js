const mongoose = require("mongoose");
const conn = require("./databaseconn").conn;
const buildingSchema = new mongoose.Schema({
  countryId: String,
  buildingId: Number,
  buildingName: String,
  countryName: String,
  address: String,
  isActive: Boolean,
});
module.exports = conn.model("building", buildingSchema);
