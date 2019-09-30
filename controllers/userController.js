
const User = require( '../models/User' )
const Joi = require( '@hapi/joi' )

// Get Users
exports.getUsers = async ( req , res , next ) => {

	try{

		const usersReturned = await User.find()
		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url ,
			length  : usersReturned.length ,
			usersReturned
		})

	}catch( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error
		})
		console.log( error )

	}


}

// Get User
exports.getUser = async ( req , res , next ) => {

	try{

		const usersReturned = await User.findById( req.params.userId )
		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url ,
			usersReturned
		})

	}catch( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error.errmsg
		})
		console.log( error )

	}

}

// Delete Users
exports.deteleUser = async ( req , res , next ) => {

	try{

		const usersReturned = await User.findByIdAndDelete( req.params.userId )
		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url ,
			usersReturned
		})
		console.log( `${usersReturned.name}` )

	}catch( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error.errmsg
		})
		console.log( error )

	}

}

// Update Users
exports.updateUser = async ( req , res , next ) => {

	try{

		const userReturned = await User.updateOne(
			{_id : req.params.userId} ,
			{
				$set : {
					name : req.body.name
				}
			}
		)
		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url ,
			userReturned
		})
		console.log( userReturned )

	}catch( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error.errmsg
		})
		console.log( error )

	}

}

// Add Users
exports.addUser = async ( req , res , next ) => {

	const schema = Joi.object(
		{
			name     : Joi.string().required().min( 5 ) ,
			email    : Joi.string().email().required() ,
			password : Joi.string().required()
		}
	)

	try {

		const auth = await schema.validateAsync( req.body )

		const user = new User({
			name     : req.body.name ,
			email    : req.body.email ,
			password : req.body.password
		})

		const newUser = await user.save()
		res.json( newUser )

		console.log( newUser )

	} catch ( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error
		})
		console.log( error )

	}

}


