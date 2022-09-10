const {Schema, model} = require("mongoose")

const fecha = new Date()
const f = fecha.getFullYear()
const schemaStudents = new Schema({
    name:String,
    coins:Number,
    assistance:Number,
    lastname: String,
    date: String,
    rut:String,
    birthDate:String,
    phone:String,
    suscription:String,
    rol:String,
    filename:String,
    path:String,
    email:String,
    address:String,
    password:String,
    course:String,
    nameA:String,
    lastnameA:String,
    rutA:String,
    emailA:String,
    phoneA:String,
    relation:String,
    suggestion:String,
    diagnosis:Boolean,
    challenge:Number,
    exercise:Number,
    block:Number,
    stage:Number,
    dateU:String,
    path:String,
    filename:String,
    trophy:Number,
    diagnosism:{type: Schema.Types.ObjectId, ref: 'diagnosisms'},
    
    startSuscription:String,
    daysAsistence:String


 
})



module.exports = model("Students", schemaStudents)