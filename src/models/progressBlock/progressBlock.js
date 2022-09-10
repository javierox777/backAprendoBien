const {Schema, model} = require("mongoose")

const schemaProgress = new Schema({
     progress:String,
     block: { type: Schema.Types.ObjectId, ref: 'blocks' },
     user: { type: Schema.Types.ObjectId, ref: 'users' }
})





module.exports = model("progress", schemaProgress)