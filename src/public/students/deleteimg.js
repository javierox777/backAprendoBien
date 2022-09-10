const ctrl = {}
const fs = require("fs")
const path = require("path")


ctrl.deleteImg =async(algo)=>{
    console.log("algo por aca  ", algo)
 await fs.unlink(path.normalize(__dirname+ "/\/"+ algo ), (error)=>{
        if(error){
            throw error
        }
    })
    
}


module.exports = ctrl