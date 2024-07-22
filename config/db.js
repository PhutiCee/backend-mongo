const mongoose = require('mongoose');
require("dotenv").config();
let MONGO_URL = process.env.MONGO_DB_URL;

const dbConnection = mongoose.createConnection(MONGO_URL).on('open',()=>{
    console.log('Db connection status: 200');
}).on('error', ()=>{
    console.log('Failed to connect to Db');
});

module.exports = dbConnection;