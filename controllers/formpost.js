const Post = require('../database/models/Post')
const path = require('path') 
const fileUpload = require('express-fileupload') //using this to upload images from a form
const moment = require('moment')
const cloudinary = require('cloudinary')

let tiempo = moment(new Date()).format('x')

module.exports = (req,res)=>{
    

    try{
        let {image} = req.files
        const uploadPath = path.resolve(__dirname,'../public/postimages',tiempo+image.name)

    image.mv(uploadPath,(err)=>{

        cloudinary.v2.uploader.upload(uploadPath, (error, result)=>{
            if (error){
                console.log('error on formpost.js, line 20')
                res.redirect('/')
            }

            Post.create({
                ...req.body,
                image: result.secure_url,
                user_id: req.session.userId
            },(err,post)=>{
                res.redirect('/')
            })
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