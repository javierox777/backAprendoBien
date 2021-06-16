const {model, Schema} = require("mongoose")


const sessionSchema = new Schema({

    exercises:{},
    dateStart:String,
    dateEnd:String,
    last:String,
    result: Number,
    timeprom: Number,
    startDate:String,
    endDate:String,
    user:{type: Schema.Types.ObjectId, ref: 'Students'}
    

})





module.exports = model("sessions", sessionSchema)