const mongoose = require('mongoose')
const moment = require('moment')

const PostSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    image: String,
    createdAt:{
        type: String,
        default: moment(new Date()).format('MMMM Do YYYY, h:mm:ss a')
    }
})


const Post = mongoose.model('Post', PostSchema)

module.exports = Post