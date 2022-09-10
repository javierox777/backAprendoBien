const {Schema, model} = require("mongoose")

const schemaDiagnosis = new Schema ({
    result:Number, 
    timeprom:Number,
    student: { type: Schema.Types.ObjectId, ref: 'Students' },
    date:String,
    exercises:[], 
    dateAt:String
   
})



module.exports = model("diagnosis", schemaDiagnosis)