const User = require('../database/models/user')
const Post = require('../database/models/Post')
const deleteError = 'Only the Author can delete a post'
//const userdeletecontrol = require('userDelete.js)
// app.get('deletePost/:post_id', userdeletecontrol)
module.exports = async (req, res) =>{

    const post = await Post.findById(req.params.post_id)
    const author = post.user_id.toString()


        if(author !== req.session.userId){
            req.flash('deleteError',deleteError) 

            return res.redirect(`/post/view/${req.params.post_id}`) //goes back and returns the flash error
        }
    
        //code to delete the post
        //const deleted = await Post.deleteOne({ObjectId(req.params.post_id)})
        post.remove()

        res.redirect('/') //go back home
}
