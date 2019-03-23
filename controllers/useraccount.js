const Users = require('../database/models/user')

module.exports = async function(req, res){
    let user = {username:'unknown'}
    
    try{
       user = await Users.findById(req.session.userId,(err, u)=>{
            if(u){
                return u
            }
            
        });
    }catch(error){
        return
    }


    let username = ''
    let about = ''
    let userimage = '/userimages/default.png'

    const allUsers = await Users.find((error, u)=>{
     u.forEach((array)=>{
         if(array.username === req.params.username){
             username = array.username
            userimage = array.userimage
            about = array.about
         }
     })
    })


    res.render('useraccount.hbs',{
        username,
        userimage,
        user,
        about
    })

}