const exprees = require('express')
const router = exprees.Router()
const User = require('../models/User')

router.get('/', (req, res, next) => {
    res.json({
        status: 200,
        message: 'success',
        url : req.url
    })
})

router.get('/user', (req, res, next) => res.json({
        status: 200,
        message: 'success',
        url : req.url,
        data : req.query
    })
)

router.post('/user/new', (req, res, next) => {
    const user = new User({
        name : req.body.name,
        age : req.body.age,
        date : req.body.date
    })
    user.save().then(user => {
        res.json({
            status: 200,
            message: 'success',
            url : req.url,
            user
        })
    }).catch(error => res.json({
        status: 200,
        message: 'failed',
        url : req.url,
        errmsg: error.errmsg
    }) )

})

module.exports = router