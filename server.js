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


sendMail = (email,link) => {
    const msg = {
        to: email,
        from: 'ieeevit@ieeevit.com',
        subject: 'IEEE Techloop Hack 2019',
        html: `
        <h4>Thank you for registering for IEEE Techloop Hack!<h4/>
        <p>If you haven't paid already, you can click </p><a href=${link}>here</a>
        <br/><br/>

        <p>With Regards,<br/>
        IEEE-VIT</p>

        <p>
        Agrim Nautiyal<br/>
        +91 91592 89775
        </p
        
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
            sendMail(req.body.email,req.body.link)

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