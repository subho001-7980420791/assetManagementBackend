const router = require("express").Router();
const building = require("../models/building");
const dbconnections = require("../models/databaseconn");
const bodyParser = require("body-parser");

dbconnections.conn.once("open", () => {
  console.log("connected");
});
router.post("/building", bodyParser.json(), async (req, res) => {
  const id = await getID("building", "buildingId");
  let build = new building({
    countryId: req.body.countryId,
    buildingId: id,
    buildingName: req.body.buildingName,
    countryName: req.body.countryName,
    address: req.body.address,
    isActive: req.body.isActive,
  });
  build
    .save()
    .then(() => {
      console.log("item saved");
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "something went wrong", err: err });
    });
});

router.get("/building", async (req, res) => {
  const re = await getData("building",);
  res.status(200).json({data:re})
});

async function getID(collection, id) {
  let uuid;
  switch (collection) {
    case "building":
      await building
        .find({})
        .sort({ buildingId: -1 })
        .then((data) => {
          
          if (data.length > 0) {
            uuid = data[0].buildingId + 1;
          } else {
            uuid = 1;
          }
        });
      break;

    default:
      break;
  }
  return uuid;
}
async function getData(collection) {
  var resu;
  switch (collection) {
    case "building":
      await building
        .find()
        .sort({ buildingId: -1 })
        .then((data) => {
          if (data.length > 0) {
            resu = data;
          } else {
            resu = [];
          }
        })
      break;

    default:
      break;
  }
  return resu;
}

module.exports = router;
