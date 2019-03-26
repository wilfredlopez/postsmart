const Post = require('../database/models/Post')
const Users = require('../database/models/user')

module.exports = async (req,res)=>{




    const post = await Post.findById(req.params.id)
    const user = await Users.findById(post.user_id)


    res.render('view.hbs',{
        pageTitle: post.title,
        post,
        user
    })
}