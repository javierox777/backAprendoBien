const SESSION = require("../../models/session/session");
const STUDENTS = require("../../models/students/students");
const EXERCISE = require("../../models/exercise/exercise");
const STAGE = require("../../models/stage/stage");
const BLOCK = require("../../models/block/block");
const MAIL = require("../mail/mail.controllers");
const moment = require("moment");
const _ = require("lodash");
require("moment/locale/es");
const ctrls = {};

const hoy = moment(new Date()).format("YYYY-MM-DD");

const hoyMenossiete = moment().subtract(7, "days").format("YYYY-MM-DD");

ctrls.getPathImageUrl = async (req, res) => {
  const data = await STAGE.findOne({ number: req.params.ids });
  const data1 = await BLOCK.findOne({
    stage: data._id,
    number: req.params.idb,
  });
  
  res.json(data1);
};
ctrls.allSessionsbyStudent = async (req, res) => {
  console.log(req.params.id);
  const data1 = await SESSION.find({ user: req.params.id });
  const data2 = data1.map(e=>{
    if(moment(e.date).format('YYYY') == moment(hoy).format('YYYY') ){
      return e
    }
  })
const data =  _.pickBy(data2, function(value, key) {
  return !(value === null);
});
  res.json(data);
  
};

ctrls.getAllSessionsForIdStudents = async (req, res) => {
  console.log(req.params.id);
  const data = await SESSION.find({ user: req.params.id });
 
  res.json({data});
  
};
ctrls.getSevenExercises = async (req, res) => {
  // for (let i = 1; i <= 7; i++) {
  //     const sumarDias = moment(hoyMenossiete).add([i], 'days').format('YYYY-MM-DD');
  //     console.log(sumarDias)
  // const data = await SESSION.find({"date":sumarDias}).where({user:req.params.id})
  // console.log(data)

  const data1 = await SESSION.find({
    date: {
      $gte: hoyMenossiete,
      $lte: hoy,
    },
  })
    .where({ user: req.params.id })
    .populate("user");
  const data2 = [];
  data1.map((e) => {
    const s = moment(e.date).format("LLLL");
    let p = s.split(",");
    data2.push({ correct: e.correct, incorrect: e.incorrect, date: p[0] });
  });
  let data = _(data2)
    .groupBy("date")
    .map((objs, key) => {
      return {
        date: key,
        incorrectos: _.sumBy(objs, "incorrect"),
        correctos: _.sumBy(objs, "correct"),
      };
    })
    .value();

  console.log(data);
  res.json(data);
  // }
};
ctrls.getExerciseForIdStudents = async (req, res) => {
  const stage = await STAGE.findOne({ number: req.params.id });
  const block = await BLOCK.find({ stage: stage._id });
  const sessionesConIdUser = await SESSION.find({user:req.params.iduser}).where("stage").equals(req.params.id)
  var cantidadEjercicioResueltos = _.sum(sessionesConIdUser.map(e=>e.numExercise));
  const idBlock = [];
  block.map((e) => {
    idBlock.push(e._id);
  });
  const cantidadEjercicios = await EXERCISE.find({
    block: idBlock.map((e) => {
      return e;
    }),
  });
  const idBlockParaEjercicio = await block.find(
    (e) => e.number == req.params.num2
  );
  const cantidadEjerciciosporBlock = await (
    await EXERCISE.find({ block: idBlockParaEjercicio._id })
  ).length;

  const cantidadTotalEjerciciosStage = cantidadEjercicios.length;
  const numBlock = block.length;

  const data = {
    stage,
    numBlock,
    cantidadTotalEjerciciosStage,
    cantidadEjerciciosporBlock,
    cantidadEjercicioResueltos
  };
  console.log("cantida de ejercicios: ", cantidadEjerciciosporBlock);
  res.json({ data });
};

ctrls.createSession = async (req, res) => {
    console.log(req.body)
 
  try {
    const {
        exercises,  
        result,
        timeprom,
        startDate,
        endDate,
        block,
        stage,
        exercise,
        battlePass,
        correct,
        incorrect,
        start,
        trophy,
        end,
      } = req.body;
    
      if (battlePass == 0) {
        exercise + 1;
      } else if (battlePass == 1) {
        block + 1;
      } else if (battlePass == 2) {
        stage + 1;
      }
      const data = new SESSION({
        exercises,
        date: hoy,
        result,
        timeprom,
        startDate,
        endDate,
        block,
        stage,
        exercise,
        numExercise: exercises.length,
        user: req.params.id,
        battlePass,
        correct,
        incorrect,
        start,
        end,
      });
      const asistencia = await STUDENTS.findById({ _id: req.params.id });
      const sessionFecha = await SESSION.find({ user: asistencia._id }).sort({
        date: 1,
      });
      const sessionFecha1 = sessionFecha[sessionFecha.length - 1];
      
      let asis;
      if (sessionFecha.length === 0) {
        asis = asistencia.assistance + 1;
      } else if (sessionFecha1.date === hoy) {
       
        asis = asistencia.assistance;
      } else {
        asis = asistencia.assistance + 1;
      }
    
    const asistenciaactualizada =  await STUDENTS.findByIdAndUpdate(
        { _id: req.params.id },
        {
          block: block,
          stage: stage,
          exercise: exercise,
          assistance: asis, //asistencia.assistance + 1
          coins: req.body.coins,
          trophy: req.body.trophy,
        },
        { new: true }
      );
      await data.save();
      MAIL.createMail(data);
      res.json({ message: "success", body: asistenciaactualizada.assistance });
      console.log("asistencia", asistenciaactualizada.assistance )
  } catch (error) {
      res.json({message:"error", body:error})
      
  }
};

ctrls.allSessions = async (req, res) => {
  const data1 = await SESSION.find().populate("user");
  const data2 = data1.map(e=>{
    if(moment(e.date).format('YYYY') == moment(hoy).format('YYYY') ){
      return e
    }
  })
const data =  _.pickBy(data2, function(value, key) {
  return !(value === null);
});
  res.json(data);
  
};

//total de sessions

ctrls.totalSessions = async (req, res) => {
  const totalsessions = await SESSION.find();
  const total = totalsessions ? totalsessions.length : 0;

  res.json({ data: total });
};

module.exports = ctrls;

