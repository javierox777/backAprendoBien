const STUDENTS = require("../../models/students/students")
const BLOCK = require("../../models/block/block")
const EXERCISE = require("../../models/exercise/exercise")
const SESSIONS = require("../../models/session/session")
const bcrypt = require("bcryptjs")
const {deleteImg} = require("../../public/students/deleteimg")
const _ = require("lodash")
const moment =require("moment")
require ('moment/locale/es');




const hoy =moment().format('YYYY-MM-DD') 
const anoActual =moment().format('YYYY') 

const ctrls = {}




//todos los estudiantes
ctrls.allStudents = async (req, res) => {
    const data = await STUDENTS.find().where({ rol: "student" })
    res.json({ data })
}


//todos los estudiantes activos
ctrls.allStudentsActivos = async (req, res) => {
    const data1 = await STUDENTS.find().where({ rol: "student" })
    const data2 = data1.map(e=>{
        if(moment(e.suscription)>= moment(hoy)){
          return e
        }
      })
       const data =data1 ? data2.filter(x => x).length : 0
      res.json(data);
}
//todos los estudiantes inactivos
ctrls.allStudentsInactivos = async (req, res) => {
    const data1 = await STUDENTS.find().where({ rol: "student" })
    const data2 = data1.map(e=>{
        if(moment(e.suscription)< moment(hoy)){
          return e
        }
      })
    const data =data1? data2.filter(x => x).length : 0
      res.json(data);
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
    // if(img.filename){
    // await deleteImg(img.filename)
    // }
    try {

        const data = await STUDENTS.findByIdAndUpdate({ _id: req.params.id },

            {
                filename: req.files[0].filename,
                path: "/students/" + req.files[0].filename,
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
    console.log("por aca el body", req.body)

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
        diagnosis,
        startSuscription,
    } = req.body

  
    const daysAsistence = moment(suscription).diff(startSuscription, "days")
    
        console.log("resta de dias :", daysAsistence)
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
            diagnosis,
            startSuscription,
            daysAsistence:daysAsistence
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

//funcion que optiene Por cada estudiante, la media de segundos, la media de errores, la media de aciertos, la media de podriamos,

ctrls.mediaStudents = async(req, res)=>{

    const usuario = await STUDENTS.find().where("rol").equals("student")
    const arraySessions = await SESSIONS.find({ 'date': { $gte: anoActual }})
    const arrayconvinado1 = []
    const arrayconvinado2 = []

     _(usuario)
    .map((objs, key) => {
     return arrayconvinado1.push({
        'user': objs,
         'result': 0,
         'timeprom': 0,
         'correct': 0,
         'incorrect':0,
         'totalEjercicios': 0,
         'sessions': 0,
     })
 })
 .value();
  _(arraySessions)
 .groupBy('user')
 .map((objs, key) => {
   let a =  _.compact(usuario.map(e=>{
      if(e._id == key){
          return e
      }
  }))
   let b={...a}
   let k = _.flattenDeep(objs.map(e =>{return e.exercises}), 2).length
   console.log(k)
   
   return arrayconvinado2.push({
      'user': b[0]?b[0]: 0,
      'result': _.meanBy(objs, c => c.result),
      'timeprom': _.meanBy(objs, c => c.timeprom),
      'correct': _.meanBy(objs, c => c.correct),
      'incorrect': _.meanBy(objs, c => c.incorrect),
      'totalEjercicios': k,
      'sessions': objs.length,
  })
})
.value();

// me hace una array de ids de usuarios
const j =  arrayconvinado2.map(r => { 
    
      
    return (r.user._id)

   
   })
 arrayconvinado1.filter(x => {

    if(!j.includes(x.user._id )){
        
        
        arrayconvinado2.push(x)
    }
})

var arrayconvinado3 = arrayconvinado2.filter(function(n) {
    return n.user !== 0; 
});
     
    res.json(arrayconvinado3)

// var merge = [] 
// merge.push(arrayconvinado1,arrayconvinado2);

// const f = _.flattenDepth(merge, 2)
// const descarte = []

//   f.map(e =>{
//      if(e.sessions > 0){
//         descarte.push(e)
//      }
// })

}

module.exports = ctrls