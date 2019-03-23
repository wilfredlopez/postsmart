const mongoose = require('mongoose')
const moment = require('moment')
const bcrypt = require('bcrypt')



const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide your Username"],
    },
    email: {
        type:String, //making email  unique
        unique: true,
        required: [true, 'Please provide your Email']
    },
    userimage:{
        type: String,
        default: '/userimages/default.png'
    },
    about: String,
    password: {
        type:String,
        required: [true, 'Please provide your Password']
    },
    createdAt:{
        type: String,
        default: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    }
})

//middleware in order to hide password  with package bcrypt // npm install bcrypt
UserSchema.pre('save',function (next){ //please user regular function to be able to use 'this'
    const user = this

    bcrypt.hash(user.password,10, function(error, encrypted){
        user.password = encrypted
        next()
    }) //the 20 is the number of encriptions. you can increase for more security
})


const Post = mongoose.model('User', UserSchema)

module.exports = Post