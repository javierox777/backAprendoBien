const DIAGNOSISM = require("../../models/diagnosism/diagnosism")
const ctrls = {}






ctrls.createDiagnosisM = async(req, res)=>{
    const {exercises, description} = req.body
    const data = new DIAGNOSISM({
        exercises,
        description
    })
    await data.save()
    res.json({data})
}




ctrls.deleteDiagnosisM = async(req, res)=>{
     await DIAGNOSISM.findOneAndDelete({_id:req.params.id})
     res.json("ok")
}

ctrls.allDiagnosis =  async(req, res)=>{
const data = await DIAGNOSISM.find()
   res.json({data})
}


ctrls.updateDiagnosism = async(req, res)=>{
    const {description} = req.body
    const data = await DIAGNOSISM.findByIdAndUpdate({_id:req.params.id},{
        description:description
    }, { new: true })
    console.log(data)
    res.json({data})
}

ctrls.updateDiagnosismPushExercise = async(req, res)=>{
     const {exercises} = req.body

    const data = await DIAGNOSISM.findByIdAndUpdate({_id:req.params.id},{
       exercises:exercises
    }, { new: true })
   
    res.json({data})
}

ctrls.updateDiagnosismPushExercise1 = async(req, res)=>{
    const {exercise} = req.body
   const data1 = await DIAGNOSISM.find({_id:req.params.id})
    
   let arr= []
    

data1.map(e=>{

    arr.push(e.exercises, exercise) 
})
 let arr1 = arr.flat()
  
 
   
 
  
   const data = await DIAGNOSISM.findByIdAndUpdate({_id:req.params.id},{
      exercises:arr1
   }, { new: true })
  
   res.json(data)
}


ctrls.getDiagnosisId = async(req, res)=>{
    const data = await DIAGNOSISM.findById({_id:req.params.id})
    
    res.json({data:data.exercises})
    console.log(data)
}


module.exports = ctrls
