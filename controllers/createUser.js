const Users = require('../database/models/user')

module.exports = async (req,res)=>{
    const user = await Users.findById(req.params.id)

    res.render('register.hbs',{
        pageTitle: "Register a new Account",
        user,
        error: req.flash('registrationErrors'),
        data: req.flash('data')[0]
    })
}