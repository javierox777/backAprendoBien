const express = require("express")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const multer =require("multer")
const { v4: uuidv4 } = require('uuid');


//config

app.set("port", process.env.PORT || 3002)

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//multer


app.use(express.urlencoded({extended:false}));
const storage = multer.diskStorage({
    destination : path.join(__dirname, 'public/students'),
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, uuidv4() + path.extname(file.originalname));
    }
}) 


app.use(multer({
    storage:storage,
    dest: path.join(__dirname, 'public/students')
 }).single('image'));// filena



//router

// STUDENTS

app.use('/api/student/', require('./routers/students/student'))

// STAGE

app.use('/api/stage', require('./routers/stage/router.stage'))

//BLOCK

app.use('/api/block', require('./routers/block/router.block'))

//EXERCISE

app.use('/api/exercise', require('./routers/exercise/exercise'))

//static file
app.use(express.static(path.join(__dirname, 'public')))






module.exports = app 



