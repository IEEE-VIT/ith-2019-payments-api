const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trxSchema = new Schema({
    Refno: {
        type: String,
        required: true,
        unique: true
    },
    tpsltranid: {
        type: String,
        required: true
    },
    bankrefno: {
        type: String,
        required: true
    },
    external: {
        type: Boolean
    },
    txndate: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    txnamount: {
        type: String
    },
    appsubmit: {
        type: String
    }
})

const trxModel = mongoose.model('transaction_data',trxSchema);

module.exports = trxModel;