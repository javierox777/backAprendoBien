const mongoose = require("mongoose")

 //const URI = "mongodb://localhost/aprendobien7"
const URI = "mongodb+srv://javier:12345@cluster0.rlonq.mongodb.net/aprendoBien?retryWrites=true&w=majority"

 mongoose.connect(URI,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
     
      })

      const connections = mongoose.connection


      connections.once("open", ()=>{
          console.log("db is ok")
      })
