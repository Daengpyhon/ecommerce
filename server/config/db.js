const mongoose = require('mongoose')

const connectDB = async()=>{
  try {
    
     await mongoose.connect(process.env.DATABASE);
     console.log('Connected DB Successfully')
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

module.exports = connectDB