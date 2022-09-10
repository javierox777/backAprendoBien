
const STAGE = require("../../models/stage/stage");
const BLOCK = require("../../models/block/block");
const fs = require("fs")

const ctrls = {};

ctrls.createStage = async (req, res) => {
  const numMaxEstage = await STAGE.findOne().sort({number:-1}).limit(1)
  console.log("numero maximo de stage",numMaxEstage)

if(!numMaxEstage){
  return res.json({
    message:"error",
    body:"stage/number-already-in-use"
  })
}else{
  const { description} = req.body;
  const data = new STAGE({
    number:numMaxEstage ? numMaxEstage.number + 1 : 1,
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
              filename: req.files[0].filename,
              path: "/students/" + req.files[0].filename,
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
  const hayBlockStage = await BLOCK.findOne().where("stage").equals(req.params.id)
  console.log("bloc encontrado ", hayBlockStage)
    if(!hayBlockStage) {
         await STAGE.findByIdAndDelete({_id:req.params.id})
         res.json({message:"success"})
    } else {
        res.json({
            message:"error",
            body:"with_blocks"
        })
    }
   
}

//total de stage 

ctrls.totalStages = async(req, res)=>{
  const totalstages = await STAGE.find()
  const total = totalstages ? totalstages.length:0

  res.json({data:total})
}

module.exports = ctrls;
