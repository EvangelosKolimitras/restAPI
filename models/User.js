const mongoose = require( 'mongoose' )

const UserSchema = mongoose.Schema({
	name : {
		type : String ,
		min  : 8
	} ,
	email : {
		type   : String ,
		unique : true
	} ,
	password : {
		type     : String ,
		required : [ true , 'A user should have a password' ]
	} ,
	date : {
		type    : Date ,
		default : Date.now
	}

})

const User = mongoose.model( 'User' , UserSchema )

module.exports = User