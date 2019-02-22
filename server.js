const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
const Validate = require('./Utils/Validate');
const cors = require('cors');


app.use(cors())

const port = process.env.PORT || 2000;

const regsModel = require('./Models/regs');

require('dotenv').config();

const app = express();
app.use(bodyParser.json());



mongoose.connect(process.env.MONGO_DB_URL, (err) => {
    err ? console.log(err) : console.log("Successfully connected to the database!");
});


app.post('/register',(req,res) => {

    validationData = Validate(req.body)

    if (validationData.Status == "Failed"){
        res.json(validationData)
    }

    else{
        regsModel.create(req.body)
        .then(data => {
            res.json({Status: 'Success',Message: 'User registered'})
        }, err => {
            if (err.code === 11000) {
                res.json({Status: 'Failed', Message: 'Duplicate entry'})
            }
            else {
                res.json({Status: 'Failed', Message: 'Required fields not give / cause unknown'})
            }
        })
    }

})

// var allowCrossDomain = function(req, res, next) {

//     var allowedOrigins = ['http://ith.ieeevit.com'];

//     var origin = req.headers.origin;
//     if(allowedOrigins.indexOf(origin) > -1){
//         res.header('Access-Control-Allow-Origin', origin);
//     }
//     res.header('Connection','keep-alive');
//     res.header('Keep-Alive','timeout=200');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, captchaCookie");
//     res.header('content-type', 'application/json');
//     res.header('Access-Control-Allow-Credentials', true);
//     if (req.method === 'OPTIONS') {
//         var headers = {
//             "Access-Control-Allow-Methods" : "GET, POST, OPTIONS",
//             "Access-Control-Allow-Credentials" : true
//         };
//         res.writeHead(200, headers);
//         res.end();
//     } else {
//         next();
//     }
// }

// app.use(allowCrossDomain);

app.listen(port, () => {
    console.log(`App started on port: ${port}.`);
});