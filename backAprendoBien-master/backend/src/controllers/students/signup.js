const STUDENTS = require("../../models/students/students")
const SESSION = require("../../models/session/session")
const EXERCISE = require("../../models/exercise/exercise")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const moment =require("moment")
require ('moment/locale/es');
const ctrls = {}


//config moment

//const hoy=moment().subtract(1, 'days').format('DD-MM-YYYY')  //restar dia
//const hoy=moment().add(10, 'months').format('DD-MM-YYYY')  //sumar dia

const hoy=moment().format('YYYY-MM-DD') 


// ctrls.signupStudent = async(req, res)=>{
    
    
//         console.log("los files por aca igual",req.file.filename)
//        await new STUDENTS()
        
//         filename= req.file
//         path='public/students/', req.file
    
//         res.json("guardadoo")
// }


ctrls.signupStudent = async(req, res)=>{
    const {   
        name,
        lastname, 
        rut,
        birthDate,
        email,
        password,
        phone, 
        address, 
        course, 
        stage, 
        nameA,
        lastnameA,
        rutA,
        emailA,
        phoneA,
        relation,
        suggestion,
        block,
        challenge,
        exercise,
        diagnosism
 
    } = req.body

 
        // const primerbloque = await BLOCK.findOne({stage:stage}).where({"number":1})

        // const primerEjercicio = await EXERCISE.findOne({block:primerbloque._id}).where({"number":1})
 

        const newStudent = new STUDENTS({
            name:name,
            lastname:lastname, 
            rut:rut,
            date:hoy,
            birthDate:birthDate,
            email:email,
            password:password,
            rol:"student", 
            phone:phone, 
            address:address, 
            course:course, 
            stage:stage, 
            nameA:nameA,
            lastnameA:lastnameA,
            rutA:rutA,
            emailA:emailA,
            phoneA:phoneA,
            relation:relation,
            suggestion:suggestion,
            suscription:hoy,
            diagnosis:false,
            exercise:exercise,
            challenge:challenge,
            diagnosism: diagnosism,
            block:block,
            path:null,
            filename:null
         
            
    })


    const newEmail =await STUDENTS.findOne({email:email})
        if(newEmail){
            return(
                res.json({
                    message:"error",
                    body:"auth/email-already-in-use"
                })
            )
        }else{
        newStudent.password =await bcrypt.hash(password, 10)
        const token = jwt.sign({_id:newStudent._id}, "aprender")
        
        await newStudent.save()
        res.json({
           message:"success",
           body:newStudent
        })
    
        }
}


ctrls.loginStudents = async(req, res)=>{
   
    const {email, password}=req.body
    const usuario = await STUDENTS.findOne({email:email})
    if(!usuario){
        return(res.json({message: "error", body:"auth/user-not-found"}))
    }
    
   
    if(usuario.suscription < hoy){    
       
        return(res.json({
            message:"error",
            body:"auth/user-whithout-suscription",
            suscriptions: usuario.suscription
            
        }))
    }

    const hash = await bcrypt.compare(password, usuario.password)
    
    if(hash){
       
        const token = jwt.sign({_id: usuario._id}, "aprender",{expiresIn:"1 days"})
       
        
       
        const data = await  STUDENTS.findById({_id:usuario._id})
        res.json({
            accessToken:token,
            user:data
        })
    }else{
        res.json({
            message:'error',
            body:"auth/wrong-password"
            
        })
    }
}

ctrls.promedioResult = async(req, res)=>{
    const promedio = await SESSION.find({user:req.params.id})

if(promedio){
        //promedio de result y time 
        let suma=[]
        let sumT=[]
         promedio.map(e=>{
          
        return( suma.push(e.result), sumT.push(e.timeprom)
         ) 
        })
        
      let  promR =( suma.reduce((totalSuma, valorResult)=>totalSuma + valorResult) / promedio.length)
      let  promT =( sumT.reduce((totalSuma, valorResult)=>totalSuma + valorResult) / promedio.length)
      let data={promedioResult:promR, promTime:promT}
    return  res.json(data)
}else{
    res.json(promedio)
}
     
}

module.exports=ctrls





