
const express = require('express')
const app  = express()
const mongoose = require('mongoose')

const port = process.env.HOSTING_PORT || 3000

// MongoDB init()
require('dotenv/config')
const db_connection_string = process.env.DB_CONNECTION_STRING;
db_connection_string
    .replace('<username>', process.env.DB_CONNECTION_USERNAME)
    .replace('<password>', process.env.DB_CONNECTION_PASSWORD)

const db_deprecation_object = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect to databe
mongoose.connect( db_connection_string, db_deprecation_object, ()=>console.log('Connected to db'))


app.get('/', (req,res,next) => {
    res.status(200).send('Responsed!')
})

// Port listening 3000
app.listen(port, (port) => console.log(`Listening on port: ${port}`))