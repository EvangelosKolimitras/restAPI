const exprees = require( 'express' )
const router = exprees.Router()
const {registerUser , loginUser , getUser , getUsers , addUser , updateUser , deteleUser} = require( '../controllers/userController' )
const AuthenticationMiddlewear = require( '../auth/auth' )

// Basic route
router.get( '/' , ( req , res , next ) => {

	try {

		res.json({
			status  : 200 ,
			message : 'success' ,
			url     : req.url
		})

	} catch( error ) {

		res.status( 200 ).json({
			message : 'failed' ,
			url     : req.url ,
			errmsg  : error.errmsg
		})

	}

})

// Register a user
router.post( '/register' , registerUser )

// Login a user
router.post( '/login' , loginUser )

// Get users with authorization token
router.get( '/users' , AuthenticationMiddlewear , getUsers )

// Get a user
router.get( '/users/:userId' , getUser )

// Delete a user
router.delete( '/users/:userId' , deteleUser )

// Update a user
router.patch( '/update/:userId' , updateUser )

// Add a user
router.post( '/new-user' , addUser )

module.exports = router