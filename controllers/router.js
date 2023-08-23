const router = require("express").Router();
const assets = require("../models/assets");
const building = require("../models/building");
const dbconnections = require("../models/databaseconn");
const bodyParser = require("body-parser");
const rooms = require("../models/rooms");

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
  const re = await getData("building");
  res.status(200).json({ data: re });
});
router.post("/asset", bodyParser.json(), async (req, res) => {
  const id = await getID("asset", "assetId");
  let asset = new assets({
    assetId: id,
    stickerId: req.body.stickerId,
    isActive: req.body.isActive,
    allocatedRoomId: req.body.allocatedRoomId,
    currentRoomId: req.body.currentRoomId,
    allocatedUserId: req.body.allocatedUserId,
    assetModelName: req.body.assetModelName,
    assetModelId: req.body.assetModelId,
    buildingId: req.body.buildingId,
    allocated: req.body.allocated,
    isActive: req.body.isActive,
  });
     asset
    .save()
    .then(() => {
      console.log("item saved");
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "something went wrong", err: err });
    });
});

router.get("/asset", async (req, res) => {
  const re = await getData("asset");
  res.status(200).json({ data: re });
});
router.post("/room", bodyParser.json(), async (req, res) => {
  const id = await getID("room", "roomId");
  let room = new rooms({
    roomId: id,
    roomName: req.body.roomName,
    buildingDetails: req.body.buildingDetails,
  });

     room
    .save()
    .then(() => {
      console.log("item saved");
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "something went wrong", err: err });
    });
});

router.get("/room", async (req, res) => {
  const re = await getData("room");
  res.status(200).json({ data: re });
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
    case "asset":
      await assets
        .find()
        .sort({ assetId: -1 })
        .then((data) => {
          if (data.length > 0) {
            uuid = data[0].assetId + 1;
          } else {
            uuid = 1;
          }
        });
      break;
      case "room":
        await rooms
          .find()
          .sort({ roomId: -1 })
          .then((data) => {
            if (data.length > 0) {
              uuid = data[0].roomId + 1;
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
        });
      break;
    case "asset":
      await assets
        .find()
        .sort({ assetId: -1 })
        .then((data) => {
          if (data.length > 0) {
            resu = data;
          } else {
            resu = [];
          }
        });
      break;
      case "room":
        await room
          .find()
          .sort({ roomId: -1 })
          .then((data) => {
            if (data.length > 0) {
              resu = data;
            } else {
              resu = [];
            }
          });
        break;
    default:
      break;
  }
  return resu;
}

module.exports = router;
