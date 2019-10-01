
const User = require( '../models/User' )
const {registerValidation , loginValidation} = require( '../validator/validator' )
const bcrypt = require( 'bcryptjs' )

// COM: Get Users
exports.getUsers = async ( req , res , next ) => {

	try{

		const data = await User.find()
		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url ,
			length  : data.length ,
			data
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

// COM: Get User
exports.getUser = async ( req , res , next ) => {

	try{

		const data = await User.findById( req.params.userId )
		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url ,
			data
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

// COM: Delete User
exports.deteleUser = async ( req , res , next ) => {

	try{

		const data = await User.findByIdAndDelete( req.params.userId )
		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url ,
			data
		})
		console.log( `${data.name}` )

	}catch( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error.errmsg
		})
		console.log( error )

	}

}

// COM: Update Users
exports.updateUser = async ( req , res , next ) => {

	try{

		const data = await User.updateOne(
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
			data
		})
		console.log( data )

	}catch( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error.errmsg
		})
		console.log( error )

	}

}

// COM: Add Users
exports.addUser = async ( req , res , next ) => {

	try {

		// Create new user
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
			error
		})
		console.log( error )

	}

}

// COM: Register Users
exports.registerUser = async ( req , res , next ) => {

	try {

		// ... => User authentication before submiting data to database => ...
		const auth = await registerValidation( req.body )
		if( !auth ) return res.status( 400 ).send( 'Joi: Validation failed!' )

		const emailExists = await User.findOne({email : req.body.email})
		if( emailExists ) return res.status( 400 ).send( 'Email already exists!' )

		// Hash the password before submition to the database => ...
		const salt = await bcrypt.genSalt( 10 )
		const hashedPassowrd = await bcrypt.hash( req.body.password , salt )

		// ... => If all the above tests pass, then an account is created
		const user = new User({
			name     : req.body.name ,
			email    : req.body.email ,
			password : hashedPassowrd
		})

		const newUser = await user.save()
		res.json({
			user : user._id
		})

		console.log( newUser )

	} catch ( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			error
		})
		console.log( error )

	}

}

// COM: Login Users
exports.loginUser = async ( req , res , next ) => {

	// ... => User authentication before submiting data to database => ...
	const auth = await loginValidation( req.body )
	if( !auth ) return res.status( 400 ).send( 'Joi: Validation failed!' )

	// ... => Chcke database for existing user and if valid => ...
	const user = await User.findOne({email : req.body.email})
	if( !user ) return res.status( 400 ).send( 'User is not found' )

	// ... => check for a matching password with his email
	const passwordIsValid = await bcrypt.compare( req.body.password , user.password )
	if( !passwordIsValid ) return res.status( 400 ).send( 'Invalid password' )

	res.send( 'Loged In' )

}


