const SESSION = require("../../models/session/session")
const STUDENTS = require("../../models/students/students")
const EXERCISE = require("../../models/exercise/exercise")
const STAGE = require("../../models/stage/stage")
const BLOCK = require("../../models/block/block")
const MAIL = require("../mail/mail.controllers")
const moment =require("moment")
require ('moment/locale/es');
const ctrls = {}


const hoy=moment().format('YYYY-MM-DD') 

ctrls.getExerciseForIdStudents = async (req, res)=>{
    const stage = await STAGE.findOne({number:req.params.id})
    const block = await BLOCK.find({stage:stage._id})
    const numBlock = block.length
 
    
    const data = {stage, numBlock }
    res.json({data})
    
}

ctrls.createSession = async(req, res)=>{
    console.log("create session", req.body)
    const { exercises,
      
        result,
        timeprom,
        startDate,
        endDate,
        block,
        stage,
        exercise,
        date
        
        } = req.body
    const data = new SESSION({ 
    exercises,
    date:hoy,
    result,
    timeprom,
    startDate,
    endDate,
    block,
    stage,
    exercise,
    numExercise:exercises.length,
    user:req.params.id
})   
     const asistencia = await STUDENTS.findById({_id:req.params.id})
     
       const asis = date === hoy ? asistencia.assistance : asistencia.assistance + 1
       console.log("asistencia ", asis)
     await STUDENTS.findByIdAndUpdate({_id:req.params.id},{
        block:block,
        stage:stage,
        exercise:exercise,
        assistance: asis //asistencia.assistance + 1
    })
    await data.save()
    MAIL.createMail(data)
    res.json({data})
}



module.exports = ctrls

