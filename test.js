const mongoose = require('mongoose')
const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})

// Post.create({
//     title:"2ND  TEST POST",
//     description:"Descroption test on test2 my post",
//     content: "test 2Lorem ipsum post content data..."
// },(error, myPost)=>{
//         error ? console.log(error) : console.log(myPost)
// })

//IF I DONT GIVE ARGUMENTS I GET ALL THE POSTS.
Post.find({},(err,post)=>{
    if(err){
        console.log('there was an error', err)
    }else{
        const titles = []
        post.forEach((p)=>{
            titles.push(p.title)
        })
        console.log(titles)
    }
})
// Post.find({
//     title:'fist test post title'
// },(err,post) =>{
//     err ? console.log('there was an error', err) : console.log(post)
    
// })

const uno = Post.findById('5c8ec5525a4e132b6ce72cc8',(err, post)=>{
    err ? console.log(err) : console.log(post.title)
})


//UPDATING INFO
Post.findByIdAndUpdate('5c8ec7fdecb68e4b6cfc0cc4',{
    title:'Fist post updated title'
},(err,post)=>{
    err ? console.log(err) : console.log(post)
})

