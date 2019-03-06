const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');

const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.options('*', cors()); 

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});


mongoose.connect(process.env.MONGO_DB_URL, (err) => {
    err ? console.log(err) : console.log("Successfully connected to the database!");
});

app.use('/',require('./Routes/routes'))


app.listen(port, () => {
    console.log(`App started on port: ${port}.`);
});