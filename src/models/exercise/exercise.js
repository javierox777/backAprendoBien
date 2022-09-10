const {Schema, model} = require("mongoose")

const schemaExercise = new Schema ({
    solution:Number, 
    filename:String,
    block: { type: Schema.Types.ObjectId, ref: 'blocks' },
    number:Number,
    path:String, 
   
})



module.exports = model("exercises", schemaExercise)