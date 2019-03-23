const Post = require('../database/models/Post')
const User = require('../database/models/user')

module.exports = async (req, res) => {
    //const posts = await Post.find({})
    
    const posts = await Post.find({}).populate('user_id')
    
    posts.sort((a,b)=>{
        if(a.createdAt > b.createdAt){
            return 1
        }else if(b.createdAt > a.createdAt){
            return -1
        }else{
            return
        }
    })
    
    User.findById(req.session.userId,(err, user)=>{
        if(err || !user){
            
            res.render('post.hbs',{
                pageTitle: "Post",
                posts,
                user: undefined
            })
        }else{
            res.render('post.hbs',{
                pageTitle: "Post",
                posts,
                user
            })

        }
    })
}