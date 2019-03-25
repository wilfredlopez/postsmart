const User = require('../database/models/user')

module.exports = function(req, res){
        User.findById(req.session.userId,(err, user)=>{
            if(err || !user){
                
                res.render('about.hbs',{
                    pageTitle: "About",
                    user: undefined
                })
            }else{
                res.render('about.hbs',{
                    pageTitle: "About",
                    user
                })
    
            }
        })

}