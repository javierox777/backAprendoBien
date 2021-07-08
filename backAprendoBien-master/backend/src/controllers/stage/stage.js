
const STAGE = require("../../models/stage/stage");
const fs = require("fs")

const ctrls = {};

ctrls.createStage = async (req, res) => {
const numero = await STAGE.findOne({number:req.body.number})
if(numero){
  return res.json({
    message:"error",
    body:"stage/number-already-in-use"
  })
}else{
  const { description, number } = req.body;
  const data = new STAGE({
    number,
    description
   
  });
  await data.save();
  res.json({
    message: "success",
    body: data,
  });
}

}

ctrls.getStage = async (req, res) => {
  const data = await STAGE.find()

  res.json({
    data
  });
};

ctrls.updateStageDescription = async (req, res) => {
  try {
    const { description } = req.body;
    const data = await STAGE.findOneAndUpdate(
      { _id: req.params.id },
      {
        description,
      },
      { new: true }
    );
    res.json({
      message: "success",
      body: data,
    });
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};

ctrls.updateStageImage = async (req, res) => {
  const { description } = req.body;
    try {
        const data = await STAGE.findOneAndUpdate(
            { _id: req.params.id },
            {
              filename: req.file.filename,
              path: "/students/" + req.file.filename,
              description:description
            },
            {new:true}
          );
     
          res.json({
            message: "success",
            body: data,
          });  
    } catch (error) {
        res.json({
            message:"error",
            body:error
        })
    }

};


ctrls.deleteStage = async(req, res)=>{
    try {
         await STAGE.findByIdAndDelete({_id:req.params.id})
         res.json({message:"success"})
    } catch (error) {
        res.json({
            message:"error",
            body:error
        })
    }
   
}

module.exports = ctrls;
