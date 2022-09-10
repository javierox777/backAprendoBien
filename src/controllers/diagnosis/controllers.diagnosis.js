const DIAGNOSIS = require("../../models/diagnosis/diagnosis")
const STUDENTS = require("../../models/students/students")
const moment = require("moment")
require('moment/locale/es');
const ctrls = {}


const hoy = moment().format('YYYY-MM-DD')
const hoyhora = moment().format('YYYY-MM-DD HH:mm:ss')

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
        dateAt: new Date()
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


//total de diagnosis

ctrls.totalDiagnosis = async(req, res)=>{
    const totaldiagnosis = await DIAGNOSIS.find()
    const total = totaldiagnosis ? totaldiagnosis.length:0
  
    res.json({data:total})
  }


  
ctrls.diagnosisPopulateAlumno = async(req, res)=>{
    const data = await DIAGNOSIS.find().populate("student");
 
    res.json({data:data})
  }


module.exports = ctrls
