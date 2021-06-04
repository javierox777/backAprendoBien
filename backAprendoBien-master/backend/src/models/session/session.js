const {model, Schema} = require("mongoose")


const sessionSchema = new Schema({

    session:{},
    date:String,
    

})





module.exports = model("sessions", sessionSchema)