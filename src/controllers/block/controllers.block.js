const { findOne, find } = require("../../models/block/block");
const BLOCK = require("../../models/block/block");
const STAGE = require("../../models/stage/stage");
const EXERCISE  =require("../../models/exercise/exercise")
const STUDENT = require("../../models/students/students")
const ctrls = {};

ctrls.getBlockIdStage = async (req, res)=>{
    const data=  await BLOCK.find().where({stage:req.params.id})
    res.json({data})
}

////////




ctrls.deleteBlock = async (req, res) => {

 const existeExercise = await EXERCISE.findOne().where({block:req.params.id})

if(!existeExercise) {

    const blokeEncontrado =  BLOCK.findById({ _id: req.params.id });
   

  if(blokeEncontrado){
    const listStudents  = await STUDENT.findOne({block:blokeEncontrado.number})
    if(!listStudents){
       const img =  await BLOCK.findByIdAndDelete({ _id: req.params.id });
     return res.json({ message: "success" });
    }else{
      return res.json({ message: "error se encontro alumno en este block" });
    }

    
    }


} else  {
  res.json({
    message: "error",
    body: "with_exercises",
  });
}
};


/////


ctrls.createBlock = async (req, res) => {
  const date = new Date()
  const block = await BLOCK.findOne({
    stage: req.body.stage,
  }).sort({number:-1}).limit(1)
  console.log("max Block", block)

  if (
    block) {
    const { description, stage, link } = req.body;
    const data1 = new BLOCK({
      description,
      number: block ? block.number + 1 : 1,
      filename: req.file[0].filename,
      path: "/students/" + req.files[0].filename,
      stage,
      link,
    
    });
    await data1.save();
    const data = await BLOCK.findOne({ _id: data1._id }).populate("stage");
    console.log("data de block por aca", data)
    res.json({
      message: "success",
      body: data,
    });
  } else {
return res.json({
      message: "error",
      body: "no hay bloque",
    });
  }
};

ctrls.getBlock = async (req, res) => {
  const data = await BLOCK.find().populate("stage");
  res.json({
    data,
  });
  // try {
  //    const data =await BLOCK.find()
  //    res.json({
  //        message:"success",
  //        body:data
  //    })
  // } catch (error) {
  //     res.json({
  //         message:"error",
  //         body:error
  //     })
  // }
};
ctrls.updateBlockDescription = async (req, res) => {
  const {description, link}=req.body
  try {

    const data = await BLOCK.findOneAndUpdate(
      { _id: req.params.id },
      {
        description:description,
        link:link

      },
      { new: true }
    ).populate('stage')

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
ctrls.updateBlockImage = async (req, res) => {
  const {description}=req.body
  


  try {

    const data = await BLOCK.findOneAndUpdate(
      { _id: req.params.id },
      {
        filename: req.files[0].filename,
        path: "/students/" + req.files[0].filename,
        description:description
      },
      { new: true }
    ).populate('stage')
  
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

//total de blocks

ctrls.totalBlocks = async(req, res)=>{
  const totalblocks = await BLOCK.find()
  const total = totalblocks ? totalblocks.length:0

  res.json({data:total})
}
module.exports = ctrls;
