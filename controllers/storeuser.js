const User = require('../database/models/user')
const path = require('path') 
const fileUpload = require('express-fileupload') //using this to upload images from a form
const moment = require('moment')


let tiempo = moment(new Date()).format('x')

module.exports = (req,res)=>{
    
    let image = {name:'default.png'}

    try{
        let {image} = req.files
        image.mv(path.resolve(__dirname,'../public/userimages',tiempo+image.name),(err)=>{
        
        })
    }catch(error){
            console.log('error uploading image')
            image = {name:'default.png'}
    }


        User.create({
            ...req.body,
            userimage: `/userimages/${tiempo+image.name}`
            
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
