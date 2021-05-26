const app = require("./app")
require("./database")



function main(){
    app.listen(app.get("port"))
    console.log("web server is :", app.get("port"))

}



main()