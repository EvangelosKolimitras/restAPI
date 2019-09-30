const Joi = require( '@hapi/joi' )

const validateData = data => {
	const schema = Joi.object(
		{
			name     : Joi.string().required().min( 5 ).alphanum() ,
			email    : Joi.string().email().required() ,
			password : Joi.string().required()
		}
	)
	return schema.validateAsync(data)
}

module.exports = validateData