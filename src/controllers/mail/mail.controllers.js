const nodemailer = require("nodemailer");
const SESION = require("../../models/session/session");
const USER = require("../../models/students/students");


var ctrl = {};

ctrl.createMail = async (data) => {
  const sesionUsuario = await SESION.findById({ _id: data._id }).populate(
    "user"
  );

  contentHTML = `
     <p class="parrafo">  Reporte de alumno :
       
            Estimado apoderado la plataforma Aprendo Bien informa que a la fecha su pupilo figura con el siguiente desempeño.
     </p>
        
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
             <br/>
            <!DOCTYPE html>
            <html lang="en">
            <head>
               
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                p, 
                ul {
                
                  padding: .1em;
                }
                
                .block,
                li {
                
                  padding: .5em;
                }
                
                ul {
                  display: flex;
                  flex-direction: column;
                  list-style: none;
                }
                
                .block {
                  display: block;
                  flex-direction: column;
                }  

              
                .margin-auto {
                  display: flex;
                  flex-direction: column;
                  background-image: linear-gradient(225deg, #ff8565 0, #ff7a6b 7.14%, #ff6d72 14.29%, #ff5f7a 21.43%, #ff5082 28.57%, #ff408a 35.71%, #ff2c92 42.86%, #f8109b 50%, #ea00a5 57.14%, #da00af 64.29%, #c700ba 71.43%, #b100c6 78.57%, #961bd1 85.71%, #742cdc 92.86%, #4139e6 100%);
                  height: 100px;
                  width: 100px;
                  border-radius: 25px;
                  margin-top: 0px;
                }
                
                .margin-auto__content {
                  margin: auto;
                  
                }

                .margin-auto2 {
                  display: flex;
                  flex-direction: column;
                  background-image: linear-gradient(225deg, #ffff99 0, #ffff74 16.67%, #ffeb4c 33.33%, #f8d110 50%, #efb600 66.67%, #e89c00 83.33%, #e38200 100%);
                  height: 100px;
                  width: 100px;
                  border-radius: 25px;
                  margin-top: 0px;
                }
                .margin-auto3 {
                  display: flex;
                  flex-direction: column;
                  background-image: linear-gradient(225deg, #aad9ff 0, #109bf8 50%, #0062de 100%);
                  height: 100px;
                  width: 100px;
                  border-radius: 25px;
                  margin-top: 0px;
                }
                

                .texto{
                  flex-direction: column;
                  width: 100px;
                  height: 100px;
                  margin-left: 20px;
                  margin-bottom: 0%;
                  margin-top: 15px;
                 
                  /* centrado vertical */
                  position: absolute;
                  top: 1%;
                }
                .contenedor{
                  margin-left: 40px;
                }

                .parrafo{
                  color: #000;
                }
</style>
                
            </head>
            <body>
                       
            <img src="cid:img" width="582" height="361" />

            <ul>
  
  <li><div class="contenedor"><div class="texto">Total ejercicios resueltos</div><div class="margin-auto"><span class="margin-auto__content">${sesionUsuario.exercises.length}</span></div></div></li>
  <br><br>
  <li><div class="contenedor"><div class="texto">Resultado logrado</div><div class="margin-auto2"><span class="margin-auto__content">${sesionUsuario.result}%</span></div></div></li>
  <br><br>
 <li> <div class="contenedor"><div class="texto">Promedio de tiempo</div><div class="margin-auto3"><span class="margin-auto__content">${sesionUsuario.timeprom}</span></div></div></li>

  </ul>



        

      </body>      

      </html>
       
        
    `;

  let transporter = await nodemailer.createTransport({
    host: "mail.aprendobien.cl",
    port: 587,
    secure: false,
    auth: {
      user: "notificaciones@aprendobien.cl",
      pass: "?=8-P{!Bo[xp",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: '"Aprendo Bien" <notificaciones@aprendobien.cl>', // sender address,
    to: `${sesionUsuario.user.emailA}`,
    subject: "reporte de alumno",
    html: contentHTML,
    attachments: [{
      filename: 'buo.gif',
      path: __dirname +'/buo.gif',
      cid: 'img' 
     }]
     
     
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

ctrl.createMailNotTask = async (data) => {
  console.log("mail data por aca", data);
  const Usuario = await USER.findById({ _id: data._id });

  contentHTML = `
    Reporte de alumno 
     
         Junto con saludarle, queremos comunicarle que su pupilo no cumplio con sus tareas el dia de hoy
         
         

         
     </ul>
     
 `;

  let transporter = await nodemailer.createTransport({
    host: "mail.aprendobien.cl",
    port: 587,
    secure: false,
    auth: {
      user: "notificaciones@aprendobien.cl",
      pass: "?=8-P{!Bo[xp",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let info = await transporter.sendMail({
    from: '"Aprendo Bien" <notificaciones@aprendobien.cl>', // sender address,
    to: `${Usuario.emailA}`,
    subject: "reporte de alumno",
    text: "reporte" + contentHTML,
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

module.exports = ctrl;






