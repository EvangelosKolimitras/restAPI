const exprees = require('express')

const router = exprees.Router()

router
    .get('/', (req,res,next) => {
        res.status(200).json({
            status : 200,
            message: 'success',
            data : [
                {
                    username : "evangelos",
                    age      : 28
                }
            ]
            
        })
    })

module.exports = router