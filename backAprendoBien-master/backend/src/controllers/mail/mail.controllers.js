const nodemailer = require('nodemailer')
const SESION = require('../../models/session/session')
var ctrl ={}

ctrl.createMail = async (data) => {
   console.log("mail por aca alumno", data)
       const sesionUsuario = await SESION.findById({_id:data._id}).populate("user")
       console.log("dentro de mail",sesionUsuario)
    
    

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
     console.log("buscar mail de usuario", sesionUsuario.user.emailA)
    let info = await transporter.sendMail({
        from: '"Aprendo Bien" <aprendobien@jupaz.cl>', // sender address,
        to: `${sesionUsuario.user.emailA}`,
        subject: 'reporte de alumno',
        text: 'reporte'+
        contentHTML
    })

    console.log('Message sent: %s', info.messageId);
    

    
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
   

    
};




module.exports = ctrl
