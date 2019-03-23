const User = require('../database/models/user')
const path = require('path') 
const fileUpload = require('express-fileupload') //using this to upload images from a form
const moment = require('moment')
const cloudinary = require('cloudinary')

let tiempo = moment(new Date()).format('x')

module.exports = (req,res)=>{
    
    //let image = {name:'default.png'}
    let {image} = req.files ||  {name:'default.png'}

    try{
        
        const uploadPath = path.resolve(__dirname,'../public/userimages',tiempo+image.name)
        image.mv(uploadPath,(err)=>{
            cloudinary.v2.uploader.upload(uploadPath, (error, result)=>{
                if (error){
                    console.log('error on formpost.js, line 20')
                    res.redirect('/')
                }

               image = {name: result.secure_url}
                User.create({
                    ...req.body,
                    userimage: image.name
                    
                    },(error,post)=>{
                    if(error){
        
                        const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        
                        req.flash('registrationErrors',registrationErrors)  //saving it into connect-flash variable
                        req.flash('data', req.body)
                        
                        return res.redirect('/auth/register')
                    }else{
                        res.redirect('/auth/login')
                    }
                })
    
            })    

        
        })
    }catch(error){
            console.log('error uploading image')
            image = {name:'default.png'}
        
            User.create({
                ...req.body,
                userimage: `/userimages/${image.name}` 
                
                },(error,post)=>{
                if(error){
    
                    const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
    
                    req.flash('registrationErrors',registrationErrors)  //saving it into connect-flash variable
                    req.flash('data', req.body)
                    
                    return res.redirect('/auth/register')
                }else{
                    res.redirect('/auth/login')
                }
            })
           
    }

}
