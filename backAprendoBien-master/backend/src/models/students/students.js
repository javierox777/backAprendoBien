const {Schema, model} = require("mongoose")

const fecha = new Date()
const f = fecha.getFullYear()
const schemaStudents = new Schema({
    name:String,
    lastname: String,
    date: String,
    rut:String,
    birthDate:String,
    phone:String,
    suscription:String,
    rol:String,
    filename:String,
    path:String,
    rol:String,
    email:String,
    address:String,
    password:String,
    course:String,
    stage:String,
    nameA:String,
    lastnameA:String,
    rutA:String,
    emailA:String,
    phoneA:String,
    relation:String,
    suggestion:String,
    diagnosis:Boolean,
    exercise: { type: Schema.Types.ObjectId, ref: 'exercises' }
 
})



module.exports = model("Students", schemaStudents)