const mongoose = require('mongoose');

const User = mongoose.Schema({
    firstName: {
        required: true,
        type: String  
    },
    lastName: {
        required: true,
        type: String
    },
    emailId: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: String
    },
    dateOfBirth: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        required: true,
        type: String
    },
    isLoggedIn: {
        required: true,
        type: Boolean
    },
    age: {
        required: false,
        type: Number
    }
})

module.exports = mongoose.model('User', User, 'User')
