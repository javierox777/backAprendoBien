const SESSION = require("../../models/session/session")
const students = require("../../models/students/students")
const STUDENTS = require("../../models/students/students")
const ctrls = {}






ctrls.createSession = async(req, res)=>{
    const data = new SESSION(req.body)

    const {idExersice} = data.students
     await STUDENTS.findByIdAndUpdate({_id:req.params.id},{
        session:idExersice
    })
    await data.save()
    res.json({data})
}



module.exports = ctrls

