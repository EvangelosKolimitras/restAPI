const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique: true
    },
    age : {
        type: Number,
        required: true,
        unique: true
    },
    date : {
        type: Date,
        default: Date.now
    }

})

const User = mongoose.model('User', UserSchema)

module.exports = User