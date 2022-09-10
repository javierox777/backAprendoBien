const {Schema, model} = require("mongoose")



const schemaStage = new Schema({
    description:String,
    number:Number,
   

})




module.exports = model("stages", schemaStage)