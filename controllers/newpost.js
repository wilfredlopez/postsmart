const User = require('../database/models/user')

// module.exports = (req, res)=>{
    
//     if(req.session.userId){
//         res.render('newpost.hbs',{
//             pageTitle: "Create Post"
//         })
//     }else{
//         res.redirect('/auth/login')
//     }
// }


module.exports = (req, res) => {
    User.findById(req.session.userId,(err, user)=>{
        if(err || !user){
            res.redirect('/auth/login')
        }else{
            res.render('newpost.hbs',{
                pageTitle: "Create Post",
                user
            })

        }
    })
}