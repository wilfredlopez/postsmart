const Post = require('../database/models/Post')
const path = require('path') 
const fileUpload = require('express-fileupload') //using this to upload images from a form
const moment = require('moment')

let tiempo = moment(new Date()).format('x')

module.exports = (req,res)=>{
    

    try{
        const {image} = req.files
    image.mv(path.resolve(__dirname,'../public/postimages',tiempo+image.name),(err)=>{
        
        
        Post.create({
            ...req.body,
            image:`/postimages/${tiempo+image.name}`,
            user_id: req.session.userId
        },(err,post)=>{
            res.redirect('/')
        })
    })
    }catch(err){
        Post.create({
            ...req.body,
            image:"#",
            user_id: req.session.userId
        },(err,post)=>{
            res.redirect('/')
        })
    }
}