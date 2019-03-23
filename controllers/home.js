const User = require('../database/models/user')


module.exports = (req, res) => {
    User.findById(req.session.userId,(err, user)=>{
        if(err || !user){
            res.render('main.hbs',{
                pageTitle: 'Post',
                user: undefined
            })
        }else{
            res.render('main.hbs',{
                pageTitle: "Post",
                user
            })

        }
    })
}

