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
        type: String,
        unique: true
    },
    txnamount: {
        type: String,
        unique: true
    },
    appsubmit: {
        type: String,
        unique: true
    }
})

const trxModel = mongoose.model('transaction_data',regsSchema);

module.exports = trxModel;