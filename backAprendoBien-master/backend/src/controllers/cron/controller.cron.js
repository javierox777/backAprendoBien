const axios = require('axios')
const cron = require('node-cron')
const SESSION = require("../../models/session/session")
const STUDENTS = require("../../models/students/students")
const {createMailNotTask}=require("../../controllers/mail/mail.controllers")
const moment =require("moment")
require ('moment/locale/es');
const ctrls = {}

var fecha = new Date();
let dia = (fecha.getDay())

const hoy=moment().format('YYYY/MM/DD') 
const hoyS=moment().format('YYYY-MM-DD') 
//const hoyMenosUno = moment().subtract(1, 'days').format('YYYY-MM-DD');


ctrls.cronn =()=>{ cron.schedule('46 14 * * * ',async ()=>{ // esta linea permite la auto ejecucion de la funcion de cron 
        console.log("hola wei se imprimio a las 3:16", hoy)
        if(dia === 6 || dia === 0 ){
         
        }else{
            console.log("no entro")
            const respuesta =await  axios.get(`https://apis.digital.gob.cl/fl/feriados/${hoy}`) //pregunto si el dia de hoy es feriado 
        
            if(respuesta.data.message == "No se han encontrado feriados" ){
                console.log("no hiso tarea")
                const students = await STUDENTS.find({suscription :{$gte:hoyS}}).where({rol:"student"});
                const idStudents = students.map(async(e)=>{
                   const session = await SESSION.find({user:e._id}).sort({"date":1})
                   const resultado = session.pop()
                   
                   if(resultado.date == hoyS){
                       console.log("si hizo")
                   }else{
                    createMailNotTask(e._id)
                     console.log("mandando id de user", e._id)
                   }
                //    if(dia === 2 || dia === 3 || dia === 4 || dia === 5 ){
                //        if(resultado.date == hoyMenosUno){
                //            console.log("manda correo")
                //        }else if(resultado.date == hoyMenosTres ){
                //         console.log("manda correo")
                //        } 
                //    }
                  
                })
            
                
            }else{
               console.log("si hiso tarea")
            }
        }
        
    })
}

module.exports = ctrls

