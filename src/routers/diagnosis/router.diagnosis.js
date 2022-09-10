const {Router} = require("express")
const router = Router()
const {createDiagnosais, totalDiagnosis, diagnosisPopulateAlumno} = require("../../controllers/diagnosis/controllers.diagnosis")





router.post('/creatediagnosis/:id', createDiagnosais)

router.get('/totaldiagnosis', totalDiagnosis)


router.get('/diagnosisalumno', diagnosisPopulateAlumno)





module.exports = router