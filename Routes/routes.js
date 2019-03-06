const express = require('express');
const _ = require('lodash');
const Validate = require('../Utils/Validate');
const request = require('request');
const regsModel = require('../Models/regs');
require('dotenv').config();

const router = express.Router();

router.post('/register',(req,res) => {
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


router.get('/payment',(req,res) => {

    request({
        url: 'https://academics.vit.ac.in/online_application2/onlinepayment/Online_pay_request1.asp',
        rejectUnauthorized: false,
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'dnt': "1",
            'accept-encoding': "gzip, deflate, br",
            'accept-languade': 'en-US,en,q=0.9',
            'cache-control': 'no-cache'
        },
        form: {
            id_event: process.env.id_event,
            id_merchant: process.env.id_merchant,
            id_password: process.env.id_password,
            id_trans: 'IETE123123',
            id_name: 'Mayank',
            amt_event: 1.00
        }
    }, function (error,response,body){
        if (error){
            res.send(error)
        }
        res.send(body)

    })
    
})


router.post('/payment/status', (req,res) => {
    console.log(req)
    res.send(req)
})

module.exports = router;