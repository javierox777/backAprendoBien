const Auth = {}
const jwt = require("jsonwebtoken")

Auth.verificartoken = (req, res, next)=>{
     if(!req.headers.autorizacion){
         return res.json({
                 mensaje:"no estas autorizado 0"
             })
         
     }
     const token = req.headers.autorizacion
     if(token === 'null'){
        return res.json({
                mensaje:"no estas autorizado 1"
            })
        

     }
     jwt.verify(token, 'aprender', (error, resultado)=>{
         if(error) return res.json({
             mensaje:"no estas autorizado"
            })
            next()
     })
     next()
}


module.exports = Auth