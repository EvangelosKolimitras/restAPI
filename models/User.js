const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    title : {
        type : String,
        default : 'Mr'
    },
    username : {
        type : String,
        require : true,
        unique : true
    },
    age : {
        type : Number,
        required : true
    }

});

const User = new mongoose.model('User', UserSchema)

module.exports = User