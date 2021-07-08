const {Schema, model}= require("mongoose")

const schemaDiagnosism = new Schema({
    exercises:[],
   description:String
})

module.exports = model("diagnosism", schemaDiagnosism)
