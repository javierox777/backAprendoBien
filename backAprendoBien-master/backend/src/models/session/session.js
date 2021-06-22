const {model, Schema} = require("mongoose")


const sessionSchema = new Schema({

    exercises:{},
    dateStart:String,
    dateEnd:String,
    date:String,
    block:Number,
    stage:Number,
    exercise:Number,
    result: Number,
    timeprom: Number,
    startDate:String,
    endDate:String,
    numExercise:Number,
    user:{type: Schema.Types.ObjectId, ref: 'Students'}
    
    

})





module.exports = model("sessions", sessionSchema)