const STUDENTS = require("../../models/students/students")
const BLOCK = require("../../models/block/block")
const EXERCISE = require("../../models/exercise/exercise")
const bcrypt = require("bcryptjs")
const ctrls = {}




//todos los estudiantes
ctrls.allStudents = async(req, res)=>{
const data = await STUDENTS.find().where({rol:"student"})
res.json({data})
}



//estudiante por id 
ctrls.idStudents = async(req, res)=>{
    const id = req.params.id
    const data = await STUDENTS.findById({_id:id})
    res.json({data})
    }
//update estudiante

ctrls.updateStudents = async(req, res)=>{
      
    if(!req.body.password == ""){ 
        
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
            nameA,
            lastNameA,
            rutA,
            emailA,
            phoneA,
            relation,
            suggestion,
          
            } =req.body
         
            const primerbloque = await BLOCK.findOne({stage:stage}).where({"number":1})
            
            const primerEjercicio = await EXERCISE.findOne({block:primerbloque._id}).where({"number":1})
          
    
    
        const data =  await STUDENTS.findOneAndUpdate({_id:req.params.id},
           
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
                nameA,
                lastNameA,
                rutA,
                emailA,
                phoneA,
                relation,
                suggestion,
                exercise:primerEjercicio._id
            },{ new: true }
         
        
            
           
        )
      
        return  res.json({
             new:true,
              message: "success",
              body:data
          })
      
    }else{
        console.log("vacio")
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
            nameA,
            lastNameA,
            password,
            rutA,
            emailA,
            phoneA,
            relation,
            suggestion
            } =req.body
           
            const primerbloque = await BLOCK.findOne({stage:stage}).where({"number":1})
          
            const primerEjercicio = await EXERCISE.findOne({block:primerbloque._id}).where({"number":1})
           
            
            const encrypt =await bcrypt.hash(password, 10)
        const data =  await STUDENTS.findOneAndUpdate({_id:req.params.id},
             
            { 
             name,
             lastName, 
             rut,
             birthDate,
             email,
             password: encrypt,
             phone, 
             suscription, 
             address, 
             course, 
             stage, 
             nameA,
             lastNameA,
             rutA,
             emailA,
             phoneA,
             relation,
             suggestion,
             exercise:primerEjercicio._id
         },{ new: true }
             
            
         )
        await data.save()
        return  res.json({
            
            message: "success",
            body:data
        })
    
    }
  
  }


  ctrls.deleteStudents = async (req, res)=>{
      await STUDENTS.findByIdAndDelete({_id:req.params.id})
      res.json({
          message:"success"
      })
  }



module.exports=ctrls