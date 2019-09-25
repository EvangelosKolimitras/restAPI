const exprees = require('express')
const router = exprees.Router()
const User = require('../models/User')

router
    .get('/', (req, res, next) => {
        res.status(200).json({
            status: 200,
            message: 'success',
            data: [
                {
                    username: "evangelos",
                    age: 28
                }
            ]

        })
    })


    .post('/new-user', (req, res, next) => {
        console.log(req.body);
        res.send(req.body)
    })

module.exports = router