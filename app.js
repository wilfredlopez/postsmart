//Imports
require('dotenv').config() //npm install dotenv
const express = require('express')
const path = require('path') //to use dirname.. i guess...
const hbs = require('hbs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload') //using this to upload images from a form
const expressSession = require('express-session')
const connectMongo = require('connect-mongo') //to store user session in mongodb database
const auth = require('./middleware/auth') //created by me to only allow authenticated users to access certain pages 
const connectFlash = require('connect-flash') //adds a flash function to the request object
const User = require('./database/models/user')
const cloudinary = require('cloudinary')


//CONTROLLERS
const homecontrol = require('./controllers/home')
const shopcontrol = require('./controllers/shop')
const postcontrol = require('./controllers/post')
const newpostcontrol = require('./controllers/newpost')
const formpostcontrol = require('./controllers/formpost')
const viewpostcontrol = require('./controllers/viewpost')
const createusercontrol = require('./controllers/createUser')
const storeusercontrol = require('./controllers/storeuser')
const logincontrol = require('./controllers/login')
const loginusercontrol = require('./controllers/loginuser')
const logoutcontrol = require('./controllers/logout')
const useraccountcontrol = require('./controllers/useraccount')
const aboutcontrol = require('./controllers/about')
const userdeletecontrol = require('./controllers/userDelete')

//database
//mongoose.connect(process.env.DB_URI, {useNewUrlParser: true}) //URI IS ON THE .ENV FILE

//REAL DATABASE MONGOLAB VIA HEROKU
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.DB_URI,{ useNewUrlParser: true } );
mongoose.set('useCreateIndex', true);

//express and middleware
const app = express()
const mongoStore = connectMongo(expressSession)
cloudinary.config({
    api_key: process.env.WILFRED_API_KEY,
    api_secret: process.env.WILFRED_API_SECRET,
    cloud_name:process.env.WILFRED_CLOUD_NAME
})
app.use(connectFlash()) //ANABLES A flash function on the request object. using it to display error messages as a one time thing
app.use(bodyParser.json()) //to be able to accept json data from client
app.use(bodyParser.urlencoded({ extended:true }))
app.use(express.static('public'))
app.set('view engine', 'hbs');
app.use(fileUpload()) //using the express-fileupload library
app.set('views', `${__dirname}/views`)
hbs.registerPartials(__dirname + '/views/partials')
app.use(expressSession({
    secret: process.env.SECRET_KEY_WILFRED,
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
  }))

  hbs.localsAsTemplateData(app);

  app.use('*',(req, res,next)=>{
    User.findById(req.session.userId,(err, user)=>{
        if(err || !user){
            hbs.registerHelper('user', undefined)
        }else{
            hbs.registerHelper('user', user)
            app.locals.user_name = user.username
        }})
     //registrando una variable global para utilizar en todos los templates
     next()
  })

 



  
//routes
app.get('/', postcontrol)
app.get('/shop', auth, shopcontrol) //added auth -> my custom middleware to make sure user is authenticated
app.get('/newpost', newpostcontrol)
app.get('/post/view/:id', viewpostcontrol)
app.get('/moreabout', homecontrol)
app.get('/auth/register',createusercontrol)
app.get('/auth/login',logincontrol)
app.get('/auth/logout',logoutcontrol)
app.post('/user/register',storeusercontrol)
app.post('/post/new',formpostcontrol)
app.post('/user/login',loginusercontrol)
app.get('/users/:username',useraccountcontrol)
app.get('/about',aboutcontrol)
app.get('/deletePost/:post_id', userdeletecontrol)

//404 PAGE
app.use((req,res)=>{res.render('notfound.hbs')})


const port = 8080
app.listen(process.env.PORT || port,()=> {
    console.log(`Listening on ${port}`)
})


