const { find } = require("../../models/exercise/exercise");
const EXERCISE = require("../../models/exercise/exercise");
const BLOCK = require("../../models/block/block")
const STAGE = require("../../models/stage/stage")
const {deleteImg} = require("../../public/students/deleteimg")
const ctrls = {};



ctrls.getAllExercisesNumBlockNumStage= async(req, res)=>{
  console.log("por aca los params ",{ algo:req.params.num, algob:req.params.numb})
  const idStage = await STAGE.findOne({number:req.params.num})
  if(!idStage){
   return res.json({message:"error",
    body:"no existe el stage"})
  }else{
    console.log("por aca el stage", idStage)
    const blockList = await BLOCK.find({stage:idStage._id})
    if(!blockList){
      return res.json({message:"error",
      body:"no existe el block"})
    }else{
      console.log("por aca el bloc", blockList)
      const findBlockforNumber = await BLOCK.findOne({number:req.params.numb}).where({"stage":blockList[0].stage}) 
      if(!findBlockforNumber){
        return res.json({message:"error",
        body:"no existe el numero del block"})
      }else{
        console.log("por aca el block numero", findBlockforNumber)
        const ordenar = await EXERCISE.find({block:findBlockforNumber._id}).populate({path:"block", populate:{path:"stage"}}).sort({"number":1})
        if(!ordenar){
          return res.json({message:"error",
          body:"no existe exercise"})
        }else{
           console.log("por aca el block ordenar", ordenar)
        const data = ordenar.sort((a, b)=>{
          if(a.number < b.number){
            return -1
          }
          if(a.number > b.number){
            return 1
          }
        })
      
      
        res.json({data})


        }
       
      }
     

    }
  

  }



}
ctrls.getAllExerciseAllBlocFooIDStage= async(req, res)=>{
  const idStage = await STAGE.findOne({number:req.params.num})
  const blockList = await BLOCK.find({stage:idStage._id})
  const findBlockforNumber = await BLOCK.findOne({number:req.params.numb}).where({"stage":blockList[0].stage}) 
  const exerciseList = await EXERCISE.find({block:findBlockforNumber._id})
  res.json({blockList, exerciseList})


}

ctrls.exerciseForBlock =  async (req, res)=>{
  const data = await EXERCISE.find({"block":req.params.id}).sort({"number":1})
  res.json({data})
}
ctrls.allExercise = async (req, res) => {
  try {
    const data = await EXERCISE.find().populate({path:"block", populate:{path:"stage"}}).sort({sage:1})
    res.json({
      data
    });
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};


ctrls.allExercisesBlok = async(req, res)=>{
  const cantidad = req.params.n 
  try {
    const data = await EXERCISE.findOne({_id:req.params.id})
    const data1 = await EXERCISE.find({"block":data.block}).sort({"number":1})
    const numeroEjercicioBlock =parseInt(data1.length)
    const cantidadArestar =parseInt(data.number)
    const ejercicioDisponible = numeroEjercicioBlock - cantidadArestar 

    if (ejercicioDisponible < cantidad){
      const data2 =await data1.slice(data.number)

      res.json(data2)

    }else{
      let resultado =[]
    const data3 = data1.slice(data.number)

      for(let i=0; i < cantidad;i++){
         resultado.push(data3[i])

      }
  

    res.json({resultado})
    }
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
}


ctrls.createExerciseWithImage = async(req, res)=>{
   
  const block1 = await EXERCISE.findOne({
    block: req.body.block
  }).sort({number:-1}).limit(1)

  
    const {  
      solution, 
      block,
 
     } = req.body;
    const data1 = new EXERCISE({
    solution, 
    block,
    filename: req.files[0].filename,
    path: "/students/" + req.files[0].filename,
    number:block1 ? block1.number + 1 : 1 ,
    
    });
    await data1.save();
    const data = await EXERCISE.findOne({ _id: data1._id }).populate("block");
    res.json({
      message: "success",
      body: data
    });
  }

  ctrls.createMultipleExercises = async(req, res)=>{
   
      const {respuestas}=req.body

      let arr = respuestas.slice(1, -1)
      let arr1 = JSON.parse("[" + arr + "]")
     
     
     
     
      const arr2 = []
      const block1 = await EXERCISE.findOne({block: req.body.id_block}).sort({number:-1})
      let data = await EXERCISE.find({ block: req.body.id_block }).populate("block");
      arr1.map(async (i, index)=>{

      const data1 = new EXERCISE({
     
      solution:i, 
      block: req.body.id_block,
      filename: req.files[index].filename,
      path: "/students/" + req.files[index].filename,
      number:block1 ? block1.number + index + 1 : 1 
      
      });
     arr2.push(data1) 
     await data1.save()
     
     
     
       })

      // data = data.concat(arr2)
      data = data.concat(arr2);


      console.log("data por aca", data)
      
      res.json({
      message: "success",
      body: data
    })
      
   
      
      
    }
  





ctrls.updateExerciseWithImage = async (req, res) => {
  try {  
    const { solution}=req.body

    const img = await  EXERCISE.findById({_id:req.params.id})
    await deleteImg(img.filename)
    const data = await EXERCISE.findOneAndUpdate({ _id: req.params.id },
      {
        solution, 
        filename: req.files[0].filename,
        path: "/students/" + req.files[0].filename,
       
      
      },
      { new: true }
    ).populate('block')
    res.json({
      message: "success",
      body: data
    });
    
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};

ctrls.updateExerciseSolution = async (req, res) => {
  try {  
    const { solution, 
      
       }=req.body
    const data = await EXERCISE.findOneAndUpdate({ _id: req.params.id },
      {
        solution, 
 
      },
      { new: true }
    ).populate('block')

    res.json({
      message: "success",
      body: data
    });
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};

ctrls.deleteExercise = async(req, res)=>{
  try {
  const img =  await EXERCISE.findByIdAndDelete({ _id: req.params.id });
   await deleteImg(img.filename)
  res.json({ message: "success" });
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};

//total de exercises

ctrls.totalExercises = async(req, res)=>{
  const totalexercises = await EXERCISE.find()
  const data = totalexercises ? totalexercises.length:0

  res.json(data)
}

module.exports = ctrls
