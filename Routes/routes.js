const express = require('express');
const _ = require('lodash');
const Validate = require('../Utils/Validate');
const request = require('request');
const regsModel = require('../Models/regs');
const dumpModel = require('../Models/dump');
const trxModel = require('../Models/transaction');
const sendMail = require('../Utils/Email');
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
            res.send({Status: "Success", Message: "User stored"})


            setTimeout(()=> {
                regsModel.findOne({id_trans: data.id_trans},(err,obj) => {
                    if (err){
                        res.send('Error')
                    }
                    else {
                        if (obj !== null && obj.payment_status === 'no'){
                            console.log({
                                name: obj.name,
                                email: obj.email,
                                mobile: obj.mobile,
                                university: obj.university,
                                id_trans: obj.id_trans,
                                bill: obj.bill
                            })
                            dumpModel.create(obj)
                            .then(dumpdata=>{
                                console.log('Data dumped!')

                            },error => {
                                console.log('Error dumping - ', error)
                            })
                        }
                        else {
                            console.log('Skipping dump!')
                        }
                    }
                })

            },10000)
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



router.post('/payment',(req,res) => {

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
            id_trans: req.body.id_trans,
            id_name: req.body.name,
            amt_event: req.body.bill
        }
    }, function (error,response,body){
        if (error){
            res.send(error)
        }
        res.send(body)

    })
    
})



router.post('/payment/status', (req,res) => {

    if (req.body.status === "0300"){
        
        regsModel.findOneAndUpdate({id_trans: req.body.Refno},{payment_status: 'paid'},() => {
            trxModel.create(req.body)
            .then(data => {
                regsModel.findOne({id_trans: req.body.Refno},(err,obj) => {
                    if (err){
                        res.send('Error')
                    }
                    else {
                        sendMail(obj.email,req.body.Refno,obj.name)
                    }
                })
                res.send("Payment Successful! Kindly check your email for confirmation. Check Spam folder if required.")
            })
            .catch(err => {
                console.log(err)
            })
        })
    }
    else{
        regsModel.deleteOne({id_trans: req.body.Refno},function(err){
            console.log(err)
        })
        res.send("Payment unsuccessful. Your registration has failed.")
    }
})

module.exports = router;