const EXERCISE = require("../../models/exercise/exercise");
const {deleteImg} = require("../../public/students/deleteimg")
const ctrls = {};

ctrls.allExercise = async (req, res) => {
  try {
    const data = await EXERCISE.find().populate({path:"block", populate:{path:"stage"}}).sort({sage:1})
    res.json({
      data,
    });
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};

// ctrls.createExercise = async(req, res)=>{
//   const block = await EXERCISE.findOne({
//     number: req.body.number,
//     block: req.body.block
//   });
// console.log("body aca : ", req.body)
//   if (block) {
//     return res.json({
//       message: "error",
//       body: "exercise/number-already-in-use",
//     });
//   } else {
//     const {  solution, 
//       block,
//       number } = req.body;
//     const data1 = new EXERCISE({
//     solution, 
//     block,
//     number,
 
//     });
//     await data1.save();
//     const data = await EXERCISE.findOne({ _id: data1._id }).populate("block");
//     res.json({
//       message: "success",
//       body: data
//     });
//   }
// }

ctrls.createExerciseWithImage = async(req, res)=>{
  const block = await EXERCISE.findOne({
    number: req.body.number,
    block: req.body.block
  });
console.log("body aca : ", req.body)
  if (block) {
    return res.json({
      message: "error",
      body: "exercise/number-already-in-use",
    });
  } else {
    const {  
      solution, 
      block,
      number,
     } = req.body;
    const data1 = new EXERCISE({
    solution, 
    block,
    filename: req.file.filename,
    path: "/students/" + req.file.filename,
    number,
    
    });
    await data1.save();
    const data = await EXERCISE.findOne({ _id: data1._id }).populate("block");
    res.json({
      message: "success",
      body: data
    });
  }
}


// ctrls.updateExercise = async (req, res) => {
//   try {  
//     const { solution, 
//       orientation, 
//       operator,
//       num1, 
//       num2, 
//       num3, 
//       num4, 
//       num5, 
//       num6 }=req.body
//     const data = await EXERCISE.findOneAndUpdate({ _id: req.params.id },
//       {
//         solution, 
//         orientation, 
//         operator,
//         num1, 
//         num2, 
//         num3, 
//         num4, 
//         num5, 
//         num6 
//       },
//       { new: true }
//     ).populate('block')

//     res.json({
//       message: "success",
//       body: data
//     });
//   } catch (error) {
//     res.json({
//       message: "error",
//       body: error,
//     });
//   }
// };


ctrls.updateExerciseWithImage = async (req, res) => {
  try {  
    const { solution}=req.body

    const img = await  EXERCISE.findById({_id:req.params.id})
    await deleteImg(img.filename)
    const data = await EXERCISE.findOneAndUpdate({ _id: req.params.id },
      {
        solution, 
        filename: req.file.filename,
        path: "/students/" + req.file.filename,
       
      
      },
      { new: true }
    ).populate('block')
    console.log("data por estos tramos", data)
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

module.exports = ctrls
