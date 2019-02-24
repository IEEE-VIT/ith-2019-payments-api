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
    regno: String,
    city: String,
    block: String,
    room: String,
    ieee_member: Boolean,
    ieee_id: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    q5: String

})

const regsModel = mongoose.model('regs',regsSchema);

module.exports = regsModel;