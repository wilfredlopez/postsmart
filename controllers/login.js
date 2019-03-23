module.exports = (req,res) =>{

    
    res.render('login.hbs',{
        pageTitle: "Create Post",
        error: req.flash('registrationErrors')
    })
}