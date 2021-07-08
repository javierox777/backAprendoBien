const SESSION = require("../../models/session/session")
const STUDENTS = require("../../models/students/students")
const EXERCISE = require("../../models/exercise/exercise")
const STAGE = require("../../models/stage/stage")
const BLOCK = require("../../models/block/block")
const MAIL = require("../mail/mail.controllers")
const moment = require("moment")
const _ = require("lodash")
require('moment/locale/es');
const ctrls = {}


const hoy = moment().format('YYYY-MM-DD')

const hoyMenossiete = moment().subtract(7, 'days').format('YYYY-MM-DD');


ctrls.getAllSessionsForIdStudents = async(req, res) =>{
    console.log(req.params.id)
    const data = await SESSION.find({user:req.params.id})
    res.json({data})
}
ctrls.getSevenExercises = async (req, res) => {
    // for (let i = 1; i <= 7; i++) {
    //     const sumarDias = moment(hoyMenossiete).add([i], 'days').format('YYYY-MM-DD');
    //     console.log(sumarDias)
        // const data = await SESSION.find({"date":sumarDias}).where({user:req.params.id})
        // console.log(data)

        const data1 = await SESSION.find({"date": {
            $gte:(hoyMenossiete),
            $lte: (hoy)
        }}).where({"user":req.params.id}).populate("user");
        const data2 =[]
        data1.map(e=>{
            const s = moment(e.date).format('LLLL')
            let   p = s.split(",")
            data2.push({correct:e.correct, incorrect:e.incorrect, date:p[0]})
        })
        let data = _(data2)
        .groupBy('date')
        .map((objs, key) => {
            return {
                'date': key,
                'incorrectos': _.sumBy(objs, 'incorrect'),
                'correctos': _.sumBy(objs, 'correct')
            }
        })
        .value();
         
        console.log(data);
        res.json(data)
   // }
}
ctrls.getExerciseForIdStudents = async (req, res) => {
    const stage = await STAGE.findOne({ number: req.params.id })
    const block = await BLOCK.find({ stage: stage._id })
    const numBlock = block.length


    const data = { stage, numBlock }
    res.json({ data })

}

ctrls.createSession = async (req, res) => {
    console.log("create session", req.body)
    const { exercises,

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
        end

    } = req.body

    if (battlePass == 0) {
        exercise + 1
        console.log("entro en 0", exercise + 1)
    } else if (battlePass == 1) {

        block + 1
        console.log("entro en 1", block + 1)
    } else if (battlePass == 2) {
        stage + 1
        console.log("entro en 2", stage + 1)
    }
    const data = new SESSION({
        exercises,
        date:hoy,
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
        end
    })
    const asistencia = await STUDENTS.findById({ _id: req.params.id })
    const sessionFecha = await SESSION.find({user:asistencia._id}).sort({"date":1})
    const sessionFecha1 = sessionFecha[sessionFecha.length - 1]
    console.log("session fecha",sessionFecha.length)
    let asis
    if(sessionFecha.length === 0){
       asis = asistencia.assistance + 1
    }else if(sessionFecha1.date === hoy){
        console.log("session fecha callo 2")
        asis =asistencia.assistance
    
    }else{
        asis =asistencia.assistance + 1
    }
   
    

    await STUDENTS.findByIdAndUpdate({ _id: req.params.id }, {
        block: block,
        stage: stage,
        exercise: exercise,
        assistance: asis //asistencia.assistance + 1
    })
    await data.save()
    MAIL.createMail(data)
    res.json({ data })
}



module.exports = ctrls

