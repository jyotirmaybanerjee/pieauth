const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({

    id: { type: Number, default: 0, unique: true}, /* Our java api has an auto incrimenting field 'id', thats why this extra id field */

    name: {
        type: String,
        required: true
    },

    email: {
        type: String
    },

    phone: {
        type: String
    }

}, {
    toObject: {
        virtuals: true
    }, toJSON: {
        virtuals: true
    }
});

module.exports = mongoose.model('Contact', ContactSchema);
