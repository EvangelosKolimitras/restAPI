const Joi = require( '@hapi/joi' )

// Register validation
exports.registerValidation = data => {

	const schema = Joi.object(
		{
			name     : Joi.string().required().min( 5 ).alphanum() ,
			email    : Joi.string().email().required() ,
			password : Joi.string().required()
		}
	)
	return schema.validateAsync( data )

}

// Login validation
exports.loginValidation = data => {

	const schema = Joi.object(
		{
			email    : Joi.string().email().required() ,
			password : Joi.string().required()
		}
	)
	return schema.validateAsync( data )

}