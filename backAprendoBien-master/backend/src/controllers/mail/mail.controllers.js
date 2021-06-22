const nodemailer = require('nodemailer')
const SESION = require('../../models/session/session')
const USER   = require("../../models/students/students")
var ctrl ={}

ctrl.createMail = async (data) => {
       const sesionUsuario = await SESION.findById({_id:data._id}).populate("user")

    
    

    contentHTML = `
       Reporte de alumno 
        
            Cantidad de ejercicios resueltos: ${sesionUsuario.exercises.length}
            promedio de asiertos            : ${sesionUsuario.result}
            tiempo promedio                 : ${sesionUsuario.timeprom}
            
            

            
        </ul>
        
    `;

    let transporter =await nodemailer.createTransport({
        host: 'mail.jupaz.cl',
        port: 587,
        secure: false,
        auth: {
            user: 'aprendobien@jupaz.cl',
            pass: 'aprendobien.2021'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: '"Aprendo Bien" <aprendobien@jupaz.cl>', // sender address,
        to: `${sesionUsuario.user.emailA}`,
        subject: 'reporte de alumno',
        text: 'reporte'+
        contentHTML
    })

   
    

    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   

    
};




ctrl.createMailNotTask = async (data) => {
    console.log("mail data por aca",data)
    const Usuario = await USER.findById({_id:data._id})

 
 

 contentHTML = `
    Reporte de alumno 
     
         Junto con saludarle, queremos comunicarle que su pupilo no cumplio con sus tareas el dia de hoy
         
         

         
     </ul>
     
 `;

 let transporter =await nodemailer.createTransport({
     host: 'mail.jupaz.cl',
     port: 587,
     secure: false,
     auth: {
         user: 'aprendobien@jupaz.cl',
         pass: 'aprendobien.2021'
     },
     tls: {
         rejectUnauthorized: false
     }
 });

 let info = await transporter.sendMail({
     from: '"Aprendo Bien" <aprendobien@jupaz.cl>', // sender address,
     to: `${Usuario.emailA}`,
     subject: 'reporte de alumno',
     text: 'reporte'+
     contentHTML
 })


 

 
 console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));


 
};




module.exports = ctrl
