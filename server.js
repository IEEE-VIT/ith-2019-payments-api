const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
const Validate = require('./Utils/Validate');
const cors = require('cors');


require('dotenv').config();

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');




const port = process.env.PORT || 5000;

const regsModel = require('./Models/regs');

const app = express();
app.use(bodyParser.json());

app.options('*', cors()); 

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://ith.ieeevit.com");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});



mongoose.connect(process.env.MONGO_DB_URL, (err) => {
    err ? console.log(err) : console.log("Successfully connected to the database!");
});



sendMail = (to,link,name) => {
    var options = {
        auth: {
            api_user: process.env.U,
            api_key: process.env.P
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(options));

    var email = {
        to: [to],
        from: 'noreply@ieeevit.com',
        subject: 'ITH 2019',
        html: `
              <div style="
                background-color: #D8D8D8;
                padding: 36px;
              ">
                <div
                    style="
                        padding: 24px;
                        background-color: #fff;
                        color: #000;
                        border-radius: 3px;
                    "
                >
                <p>Hi ${name},</p>
                <p>Thank you for registering for ITH 2019.</p>
                <p>To confirm your participation, proceed to the payment portal by clicking on the button below.</p><br/>
                <a
                style="
                background-color: #2196f3;
                color: #fff;
                font-weight: bolder;
                padding: 8px 18px;
                font-size: 12px;
                border-radius: 3px;
                text-decoration: none;"
                href=${link}
                "
                >Finish Payment</a><br/>
                <p style="font-size: 10px; color: #B0B0B0;">Ignore this email if you have already paid</p>
                </div>
                <p
                style="
                font-size: 12px;
                color:#909090;"
                >Gorbachev Rd, Vellore, Tamil Nadu 632014</p>
              </div>
              `
    };
     
    mailer.sendMail(email, function(err, res) {
        if (err) { 
            console.log(err) 
        }
        console.log('Email sent')
    });

}


app.post('/register',(req,res) => {
    validationData = Validate(req.body)

    if (validationData.Status == "Failed"){
        res.json(validationData)
    }

    else{
        regsModel.create(req.body)
        .then(data => {
            res.json({Status: 'Success',Message: 'User registered'})
            sendMail(req.body.email,req.body.link,req.body.name)

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


app.listen(port, () => {
    console.log(`App started on port: ${port}.`);
});