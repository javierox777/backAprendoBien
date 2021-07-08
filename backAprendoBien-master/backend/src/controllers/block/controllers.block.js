const { findOne, find } = require("../../models/block/block");
const BLOCK = require("../../models/block/block");
const STAGE = require("../../models/stage/stage");
const ctrls = {};

ctrls.getBlockIdStage = async (req, res)=>{
    const data=  await BLOCK.find().where({stage:req.params.id})
    res.json({data})
}

ctrls.deleteBlock = async (req, res) => {
  try {
  const img =  await BLOCK.findByIdAndDelete({ _id: req.params.id });
  console.log("aca img",img.path)
    // fs.unlink(img.path, (error)=>{
    //     if(error){
    //         throw error
    //     }
    // })
    res.json({ message: "success" });
  } catch (error) {
    res.json({
      message: "error",
      body: error,
    });
  }
};
ctrls.createBlock = async (req, res) => {
  const block = await BLOCK.findOne({
    number: req.body.number,
    stage: req.body.stage,
  });

  if (block) {
    return res.json({
      message: "error",
      body: "block/number-already-in-use",
    });
  } else {
    const { description, number, stage, link } = req.body;
    const data1 = new BLOCK({
      description,
      number,
      filename: req.file.filename,
      path: "/students/" + req.file.filename,
      stage,
      link
    });
    await data1.save();
    const data = await BLOCK.findOne({ _id: data1._id }).populate("stage");
    res.json({
      message: "success",
      body: data,
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
        filename: req.file.filename,
        path: "/students/" + req.file.filename,
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

module.exports = ctrls;
