const router = require("express").Router();
const assets = require("../models/assets");
const building = require("../models/building");
const dbconnections = require("../models/databaseconn");
const bodyParser = require("body-parser");
const rooms = require("../models/rooms");
const users = require("../models/users");
const countries = require("../models/countries");

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
router.post("/user", bodyParser.json(), async (req, res) => {
  const id = await getID("user", "userId");
  let user = new users({
    userId: id,
    userName: req.body.userName,
    isActive: req.body.isActive,
  });

  user
    .save()
    .then(() => {
      console.log("item saved");
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "something went wrong", err: err });
    });
});

router.get("/user", async (req, res) => {
  const re = await getData("user");
  res.status(200).json({ data: re });
});
router.post("/country", bodyParser.json(), async (req, res) => {
  const id = await getID("country", "countryId");
  let country = new countries({
    countryId: id,
    countryName: req.body.countryName,
    isActive: req.body.isActive,
  });

  country
    .save()
    .then(() => {
      console.log("item saved");
      res.status(200).json({ msg: "success" });
    })
    .catch((err) => {
      res.status(500).json({ msg: "something went wrong", err: err });
    });
});

router.get("/country", async (req, res) => {
  const re = await getData("country");
  res.status(200).json({ data: re });
});
router.get("/allCount", async (req, res) => {
  const country = await getID("country","countryId");
  const user = await getID("user","userId");
  const asset = await getID("asset","assetId");
  const building = await getID("building","buildingId");
  const room = await getID("room","roomId");
  const data={
    country:country-1,
    user:user-1,
    asset:asset-1,
    building:building-1,
    room:room-1,
  }
  res.status(200).json(data);
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
    case "user":
      await users
        .find()
        .sort({ userId: -1 })
        .then((data) => {
          if (data.length > 0) {
            uuid = data[0].userId + 1;
          } else {
            uuid = 1;
          }
        });
      break;
    case "country":
      await countries
        .find()
        .sort({ countryId: -1 })
        .then((data) => {
          if (data.length > 0) {
            uuid = data[0].countryId + 1;
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
      await rooms
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
    case "user":
      await users
        .find()
        .sort({ userId: -1 })
        .then((data) => {
          if (data.length > 0) {
            resu = data;
          } else {
            resu = [];
          }
        });
      break;
    case "country":
      await countries
        .find()
        .sort({ countryId: -1 })
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
