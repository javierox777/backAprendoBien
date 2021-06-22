const app = require("./app")
require("./database")
 const cron = require('node-cron')
 const {cronn}= require("./controllers/cron/controller.cron")


function main(){
    app.listen(app.get("port"))
    console.log("web server is :", app.get("port"))
     cronn()
    //tareas programables
    // cron.schedule(' * * * * * ', ()=>{
    //     console.log("hola wei")
    // })
}



main()