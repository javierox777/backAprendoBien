const STUDENTS = require("../../models/students/students")
const BLOCK = require("../../models/block/block")
const EXERCISE = require("../../models/exercise/exercise")
const bcrypt = require("bcryptjs")
const {deleteImg} = require("../../public/students/deleteimg")
const ctrls = {}




//todos los estudiantes
ctrls.allStudents = async (req, res) => {
    const data = await STUDENTS.find().where({ rol: "student" })
    res.json({ data })
}



//estudiante por id 
ctrls.idStudents = async (req, res) => {
    const id = req.params.id
    const data = await STUDENTS.findById({ _id: id })
    res.json({ data })
}


//update photo Students

ctrls.updatePhotoStudent = async (req, res) => {
    console.log("students body",req.body)
    const img = await  STUDENTS.findById({_id:req.params.id})
    if(img.filename){
    await deleteImg(img.filename)
    }
    try {

        const data = await STUDENTS.findByIdAndUpdate({ _id: req.params.id },

            {
                filename: req.file.filename,
                path: "/students/" + req.file.filename,
            },
            { new: true }
        );

        return res.json({
            message: "success",
            body: data,
        });
    } catch (error) {
        return res.json({
            message: "error",
            body: error,
        });
    }
};
//update estudiante

ctrls.updateStudents = async (req, res) => {

    const {
        name,
        lastName,
        rut,
        birthDate,
        email,
        phone,
        suscription,
        address,
        course,
        stage,
        block,
        exercise,
        challenge,
        nameA,
        lastNameA,
        rutA,
        emailA,
        phoneA,
        relation,
        suggestion,
        diagnosism,
        diagnosis
    } = req.body

    const data = await STUDENTS.findOneAndUpdate({ _id: req.params.id },

        {
            name,
            lastName,
            rut,
            birthDate,
            email,
            phone,
            suscription,
            address,
            course,
            stage,
            block,
            challenge,
            nameA,
            lastNameA,
            rutA,
            emailA,
            phoneA,
            relation,
            suggestion,
            exercise,
            diagnosism,
            diagnosis
        }, { new: true }

    )

    return res.json({
        new: true,
        message: "success",
        body: data
    })



}

ctrls.updatePassword = async (req, res) => {
    const { password } = req.body
    console.log("update password", req.body)
    const encrypt = await bcrypt.hash(password, 10)
    const data = await STUDENTS.findByIdAndUpdate({ _id: req.params.id }, {
        password: encrypt
    }, { new: true })
    res.json({ data })
}
ctrls.deleteStudents = async (req, res) => {
    await STUDENTS.findByIdAndDelete({ _id: req.params.id })
    res.json({
        message: "success"
    })
}



module.exports = ctrls