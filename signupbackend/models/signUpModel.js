const mongoose = require('mongoose');

const signUpTemplate = new mongoose.Schema({
    fullName:{
        type: String,
        required: false
    },
    userName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
        // validate: [{validator: value => isEmail(value), msg:'Invalid Email.'}]
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },

})

module.exports = mongoose.model('myTable', signUpTemplate)