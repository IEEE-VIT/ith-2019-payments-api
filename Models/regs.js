const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const regsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    external: {
        type: Boolean
    },
    university: {
        type: String,
        required: true
    },
    combo: String,
    track: String,
    regno: {
        type: String
    },
    ieee_member: Boolean,
    ieee_id: String,
    gender: String,
    TimeStamp: String,
    id_trans: {
        type: String,
        unique: true
    },
    bill: Number,
    payment_status: String,
    acc: Boolean
})

const regsModel = mongoose.model('new_registration',regsSchema);

module.exports = regsModel;