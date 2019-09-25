
const express = require('express')
const app  = express()


app.get('/', (req,res,next) => {
    res.status(200).send('Responsed!')
})

// Port listening 3000
app.listen(3000, () => console.log('Listening on port 3000'))