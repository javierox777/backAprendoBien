const STUDENTS = require("../../models/students/students")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const moment =require("moment")
require ('moment/locale/es');
const ctrls = {}


//config moment

//const hoy=moment().subtract(1, 'days').format('DD-MM-YYYY')  //restar dia
//const hoy=moment().add(10, 'months').format('DD-MM-YYYY')  //sumar dia

const hoy=moment().format('YYYY-MM-DD') 

console.log(hoy)
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
        suggestion
    } = req.body
        const newStudent = new STUDENTS({
            name:name,
            lastname:lastname, 
            rut:rut,
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
            diagnosis:false
            
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
        console.log("success",newStudent)
        await newStudent.save()
        res.json({
           message:"success",
           body:newStudent
        })
    
        }
}


ctrls.loginStudents = async(req, res)=>{
    console.log("req por aca :", req.body)
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
    console.log("por aca el hash", hash)
    if(hash){
        const token = jwt.sign({_id: usuario._id}, "aprender",{expiresIn:"1 days"})
        const data = await  STUDENTS.findById({_id:usuario._id}).populate("exercise")
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


module.exports=ctrls





