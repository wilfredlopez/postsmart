module.exports = (req,res) =>{

    
    res.render('login.hbs',{
        pageTitle: "Login",
        error: req.flash('registrationErrors')
    })
}