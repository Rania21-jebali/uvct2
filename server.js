require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors= require('cors')
const cookieParser= require('cookie-parser')
const app = express()
const multer = require('multer')
app.use(express.json())
app.use(cors())
app.use(cookieParser())


//Routes
app.use('/user',require('./routes/user'))

app.use('/',require('./controllers/upload'))
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