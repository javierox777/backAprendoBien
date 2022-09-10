const {Schema, model} = require("mongoose")



const schemaPeriodoAcademico = new Schema({
    year:Date,
    tipo:String,
    students:{type: Schema.Types.ObjectId, ref: 'Students'}
})


modulo.exports = model("periodoAcademico", schemaPeriodoAcademico)