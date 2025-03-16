const mongoose = require('mongoose')
const express = require("express")
const app = express();
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((responce) => {
        console.log("Connected to MongoDB , ", responce.connection.name);
    })
    .catch((err) => console.log(err));
    

