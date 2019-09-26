
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path : `${__dirname}/.env`})

// Pases the body for a post requrest to the server
app.use(express.json())

// Users router
const usersRoute = require('./routes/usersRoute')
app.use('/', usersRoute)

// // Connection to database
mongoose.connect(
    process.env.DB_CONNECTION_STRING, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true 
    }, 
    () => console.log('Connected to db'))


// Port listening 
const PORT = process.env.APP_PORT
app.listen(PORT, () => { console.log(`Listening on port: ${PORT}`); })