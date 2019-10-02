const jwt = require( 'jsonwebtoken' )

// COM: Token Authorization 
module.exports = AuthenticationMiddlewear = ( req , res , next ) => {

	const token = req.header( 'Autchentication-Token' )
	if( !token ) return res.status( 401 ).json({message : 'Access Denied'})


	try {

		const tokenVerified = jwt.verify( token , process.env.TOKEN )
		res.user = tokenVerified
		console.log( tokenVerified )

	} catch ( error ) {

		res.status( 400 ).json({
			message : 'Bad request'
		})

	}

	next()

}