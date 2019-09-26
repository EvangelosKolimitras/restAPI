const exprees = require('express')
const router = exprees.Router()
const {getUser, getUsers, addUser, updateUser, deteleUser } = require('../controllers/userController');

// Basic route
router.get('/',  (req, res, next) => {
    try {
        res.json({
            status: 200,
            message: 'success',
            url: req.url
        })
    } catch(error) {
        res.status(200).json({
            message: 'failed',
            url : req.url,
            errmsg: error.errmsg
        })
    }
})

// Get users 
router.get('/users',  getUsers)

// Get a user
router.get('/users/:userId',  getUser )

// Delete a user
router.delete('/users/:userId', deteleUser)

// Update a user
router.patch('/users/:userId', updateUser)

// Add a user
router.post('/new-user', addUser)

module.exports = router