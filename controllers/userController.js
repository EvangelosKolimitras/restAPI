
const User = require('../models/User')

// Get Users
exports.getUsers = async (req, res, next) => {
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
}

// Get User
exports.getUser = async (req, res, next) => {
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
}

// Delete Users
exports.deteleUser = async (req, res, next) => {
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
}

// Update Users
exports.updateUser = async (req, res, next) => {
    try{
        const userReturned = await User.updateOne(
            {_id: req.body.userId}, 
            { $set: {
                name: req.body.name
            }}
        )
        res.json({
            status: 200,
            message: 'success',
            url : req.url,
            userReturned
        })
        console.log(userReturned);
    }catch(error) {
        res.status(200).json({
            message: 'failed',
            url : req.url,
            errmsg: error.errmsg
        })
    }
}

// Add Users
exports.addUser =async (req, res, next) => {
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
}











