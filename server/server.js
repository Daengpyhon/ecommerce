const express = require('express');
//const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config()
const morgan = require('morgan');
const connectDB = require('./config/db');

//! Automatic directory Read  
const {readdirSync} = require('fs');
const { ifError } = require('assert');

const app = express();
connectDB();

// Middleware

app.use(morgan('dev'))
app.use(bodyParser.json({limit: '20mb'}))
app.use(cors())

// Route
// http://localhost:9090/api 
//app.use('/api', require('./routes/api'))

readdirSync('./routes').map((file)=>app.use('/api', require('./routes/'+file)))

// if(process.env.NODE_ENV==='production'){
//    app.use(process.static(path.join(__dirname, '../build')))

//    app.get('*', (req,res)=>{
//     res.sendFile(path.join(__dirname, '../build/index.html'))
//    })
// }

const port = process.env.PORT
app.listen(port, () =>{
  console.log('Server Running on port : ' + port)
})