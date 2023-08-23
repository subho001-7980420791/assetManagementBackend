const mongoose= require('mongoose');
require('dotenv').config()
//connection
var conn     = mongoose.createConnection(process.env.DataBase_Url);
module.exports= {
conn: conn
}

