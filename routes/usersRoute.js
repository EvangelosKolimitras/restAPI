const exprees = require('express')
const router = exprees.Router()
const User = require('../models/User')

// Basic route
router.get('/', (req, res, next) => {
    res.json({
        status: 200,
        message: 'success',
        url : req.url
    })
})

// Get all users 
router.get('/users', async (req, res, next) => {
    try{
        const usersReturned = await User.find()
        res.json({
            status: 200,
            message: 'success',
            url : req.url,
            length: usersReturned.length,
            usersReturned
        })
    }catch(error) {
        res.status(200).json({
            message: 'failed',
            url : req.url,
            errmsg: error.errmsg
        })
    }
})

// Get a specific user
router.get('/users/:userId', async (req, res, next) => {
    try{
        const usersReturned = await User.findById(req.params.userId)
        res.json({
            status: 200,
            message: 'success',
            url : req.url,
            usersReturned
        })
    }catch(error) {
        res.status(200).json({
            message: 'failed',
            url : req.url,
            errmsg: error.errmsg
        })
    }
})

// Delete a specific user
router.delete('/users/:userId', async (req, res, next) => {
    try{
        const usersReturned = await User.findByIdAndDelete(eq.params.userId)
        res.json({
            status: 200,
            message: 'success',
            url : req.url,
            usersReturned
        })
        console.log(`${usersReturned.name}`)
    }catch(error) {
        res.status(200).json({
            message: 'failed',
            url : req.url,
            errmsg: error.errmsg
        })
    }
})

// Update a specific user
router.patch('/users/:userId', async (req, res, next) => {
    try{
        const usersReturned = await User.updateOne(eq.params.userId)
        res.json({
            status: 200,
            message: 'success',
            url : req.url,
            usersReturned
        })
    }catch(error) {
        res.status(200).json({
            message: 'failed',
            url : req.url,
            errmsg: error.errmsg
        })
    }
})

router.post('/new-user', async (req, res, next) => {
    try {
        const user = new User({
            name : req.body.name,
            age : req.body.age,
            date : req.body.date
        })
        const newUser = await user.save();
        res.json(newUser)
    } catch (error) {
        res.status(200).json({
            message: 'failed',
            url : req.url,
            errmsg: error.errmsg
        })
    }
})

module.exports = router