const express = require('express');
const router = require('./controllers/router');
const cors=require("cors");
require('dotenv').config()
const app = express();

app.get('/', (req, res) => {
  
});

app.use(cors());

app.use("/api", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});