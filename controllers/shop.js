const User = require('../database/models/user')


module.exports = (req, res) => {
    User.findById(req.session.userId,(err, user)=>{
        if(err || !user){
            res.render('shop.hbs',{
                pageTitle: "Shop",
                user: undefined
            })
        }else{
            res.render('shop.hbs',{
                pageTitle: "Shop",
                user
            })

        }
    })
}