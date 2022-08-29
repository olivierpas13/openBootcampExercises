require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
.then(()=> console.log('connected to mongoDB'))
.catch((error)=> console.log('error connecting to mongoDB', error.message))

