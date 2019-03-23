const User = require('../database/models/user')

module.exports = (req, res, next) =>{
    //fetch user from database
    User.findById(req.session.userId, (err, user) =>{
        if(err || !user){
            return res.redirect('/auth/login')
        }

           next() 

    })

}