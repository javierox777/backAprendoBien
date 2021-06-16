const SESSION = require("../../models/session/session")
const STUDENTS = require("../../models/students/students")
const EXERCISE = require("../../models/exercise/exercise")
const BLOCK = require("../../models/block/block")
const MAIL = require("../mail/mail.controllers")
const ctrls = {}




ctrls.getExerciseForIdStudents = async (req, res)=>{
    const data0 = await EXERCISE.findById({_id:req.params.id}).populate({path:"block", populate:{path:"stage"}}).sort({sage:1})
 
    const data1 = await BLOCK.find().where({"stage":data0.block.stage._id}).count()
    const data = {block_actual:data0.block.number, numero_blokes_total:data1, name_stage:data0.block.stage.description }
    res.json({data})
    
}

ctrls.createSession = async(req, res)=>{
    console.log("req,body de crear session",req.body)
    const { exercises,
        date,
        last,
        result,
        timeprom,
        startDate,
        endDate,
        
        } = req.body
    const data = new SESSION({ 
    exercises,
    date,
    last,
    result,
    timeprom,
    startDate,
    endDate,
    user:req.params.id
})
     await STUDENTS.findByIdAndUpdate({_id:req.params.id},{
        exercise:last
    })
    await data.save()
    MAIL.createMail(data)
    res.json({data})
}



module.exports = ctrls

