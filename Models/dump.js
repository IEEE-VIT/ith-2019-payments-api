const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dumpSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    id_trans: {
        type: String,
        unique: true
    },
    bill: Number,
})

const dumpModel = mongoose.model('dump',dumpSchema);

module.exports = dumpModel;