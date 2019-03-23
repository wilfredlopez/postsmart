const User = require('../database/models/user')
const bcrypt = require('bcrypt')
const registrationErrors = 'Invalid Credentials, Please try again'

module.exports = (req, res) =>{
    //validate user
    const {email, password} = req.body

    User.findOne({email}, (error, user)=>{
        if(user){
            bcrypt.compare(password, user.password, (err, same)=>{
                if(same){
                    //store user session .. //npm install express-session
                    req.session.userId = user.id //this gets the cookies from user browser
                    return res.redirect('/')
                }else{

                req.flash('registrationErrors',registrationErrors)  //saving it into connect-flash variable
                
                return  res.redirect('/auth/login')//if user is not found
                }
            }) //comparing the hashed password
        }else{
            req.flash('registrationErrors',registrationErrors)  //saving it into connect-flash variable
                
                return  res.redirect('/auth/login')//if user is not found
        }
        
    }) 
}
