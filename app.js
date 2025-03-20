const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const postRoute = require('./routers/posts')
const authRoute = require('./routers/auth')
require('dotenv/config')

app.use(bodyParser.json())

app.use(bodyParser.json())
app.use('/api/posts',postRoute)
app.use('/api/user',authRoute)

app.use('/', (req,res) => {
    res.send({message:'home'})
})

mongoose.connect(process.env.DB_CONNECTOR).then(()=>{
    console.log('MongoDB connector is on')
}).catch((err) => {
    console.error('MongoDB connection error:', err);
})

app.listen(3000, ()=> {
    console.log('Server is running...')
})