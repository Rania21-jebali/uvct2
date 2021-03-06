require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors= require('cors')
const cookieParser= require('cookie-parser')
const app = express()
const multer = require('multer')
const fileUpload = require('express-fileupload')
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
  useTempFiles: true
}))

//Routes
app.use('/user',require('./routes/user'))
app.use('/',require('./routes/formation'))
app.use('/',require('./routes/event'))
app.use('/',require('./routes/compte'))
app.use('/',require('./routes/section'))
app.use('/',require('./routes/session'))
app.use('/',require('./routes/categorie'))
app.use('/',require('./routes/sousCategorie'))
app.use('/',require('./routes/reclamation'))
app.use('/',require('./routes/message'))
app.use('/',require('./routes/history'))
app.use('/',require('./routes/coupon'))
app.use('/api', require('./routes/upload'))


app.use(express.static('public'));

// Connect to mongoose
const URI = process.env.MONGOBD_URL
mongoose.connect(URI,{useNewUrlParser: true , useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const PORT= process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('server is running on port', PORT)
})