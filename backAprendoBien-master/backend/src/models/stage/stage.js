const {Schema, model} = require("mongoose")



const schemaStage = new Schema({
    description:String,
    filename: String,
    number:Number,
    path : String,

})




module.exports = model("stages", schemaStage)