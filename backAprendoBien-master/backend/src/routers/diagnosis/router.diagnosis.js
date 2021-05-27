const {Router} = require("express")
const router = Router()
const {createDiagnosais} = require("../../controllers/diagnosis/controllers.diagnosis")





router.post('/creatediagnosis/:id', createDiagnosais)




module.exports = router