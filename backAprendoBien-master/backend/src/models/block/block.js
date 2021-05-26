const {Schema, model} = require("mongoose")


const schemaBlock = new Schema({
    description : String,
    number : Number,
    filename:String,
    path:String,
    stage: { type: Schema.Types.ObjectId, ref: 'stages' }
})




module.exports = model("blocks",  schemaBlock)