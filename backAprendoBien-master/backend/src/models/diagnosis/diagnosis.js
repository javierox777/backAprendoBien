const {Schema, model} = require("mongoose")

const schemaDiagnosis = new Schema ({
    result:Number, 
    timeprom:Number,
    student: { type: Schema.Types.ObjectId, ref: 'students' },
    date:String,
    exercises:[], 
   
})



module.exports = model("diagnosis", schemaDiagnosis)