const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
const Validate = require('./Utils/Validate');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');



const port = process.env.PORT || 5000;

const regsModel = require('./Models/regs');

require('dotenv').config();
sgMail.setApiKey(process.env.SG_API_KEY);

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


sendMail = (email,link,name) => {

    const msg = {
        to: email,
        from: {
            email: 'noreply@ieeevit.com',
            name: 'Team ITH'
        },
        subject: 'ITH 2019',
        html: `
        <div
            style="
                background-color: #D3D3D3;
                padding: 36px;
            "
        >
            <div 
            style="
                background-color: #fff;
                border-radius: 2px;
                padding: 20px;"
            >
            <p>Hi ${name},</p><br/><br/>
            <p>Thank you for registering for ITH, 2019. To finish your payment, click on the button below.</p>
            <br></br>
            <a
                style="
                background-color: #2196f3;
                color: #fff;
                font-weight: bolder;
                padding: 6px 18px;
                font-size: 12px;
                border-radius: 3px;"
                href=${link}
            >Complete Payment</a>
            <br/><br/>
            IEEE-VIT
            </div>
            <p
            style="
            font-size: 8px;
            color:#909090;"
            >Gorbachev Rd, Vellore, Tamil Nadu 632014</p>
        </div>
        
        `
        
      };

    sgMail.send(msg, function(err, json ){
        if (err) {console.log(err)}
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