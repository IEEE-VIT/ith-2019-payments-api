const express = require('express');
const _ = require('lodash');
const Validate = require('../Utils/Validate');

const regsModel = require('../Models/regs');

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

router.post('/payment/status', (req,res) => {
    res.send({
        Message: "Route works"
    })
})

module.exports = router;