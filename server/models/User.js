const mongoose = require('mongoose')
const {ObjectId} =  mongoose.Schema
const UserSchema =  new mongoose.Schema({
    fname : {
      type: String
    },
    lname :{
      type: String
    }, 
    username : {
      type: String
    },
    password : {
      type: String
    },
    email : {
      type: String
    },
    role : {
      type: String,
      default : 'user'
    },
    enabled : {
      type: Boolean,
      default : false,
    },
    address :{
      type : String,
    }, 
    wishlist : [{
      type : ObjectId,
      ref : 'products'
    }]
},
{timestamps : true}
)

module.exports = MyUser = mongoose.model('users', UserSchema)