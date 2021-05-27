const DIAGNOSIS = require("../../models/diagnosis/diagnosis")
const STUDENTS = require("../../models/students/students")
const moment = require("moment")
require('moment/locale/es');
const ctrls = {}


const hoy = moment().format('YYYY-MM-DD')

console.log(hoy)



ctrls.createDiagnosais = async (req, res) => {
    const {
        result,
        timeprom,
        exercises,
    } = req.body
    const newDiagnosis = new DIAGNOSIS({

        result,
        timeprom,
        student:req.params.id,
        exercises,
        data: hoy
    })

    await newDiagnosis.save()
    

   const data = await STUDENTS.findByIdAndUpdate({ _id: req.params.id }, {
        diagnosis: true
    },
    { new: true })
    res.json({
        message: "success",
        body: data
    }) 
console.log("data", data)
}





module.exports = ctrls
