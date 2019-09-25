
const express = require('express')
const app = express()
const mongoose = require('mongoose')

const port = process.env.HOSTING_PORT || 3000
const usersRoute = require('./routes/usersRoute')

// Pases the body for a post requrest to the server
app.use(express.json())

// Users router
app.use('/', usersRoute)

// MongoDB initialization
require('dotenv/config')
const db_connection_string = process.env.DB_CONNECTION_STRING;
db_connection_string
.replace('<username>', process.env.DB_CONNECTION_USERNAME)
.replace('<password>', process.env.DB_CONNECTION_PASSWORD)

const db_deprecation_object = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connection to database
mongoose.connect(db_connection_string, db_deprecation_object, () => console.log('Connected to db'))

// Port listening 
app.listen(port, (port) => console.log(`Listening on port: ${port}`))