const {Router} = require("express")
const router = Router()
const {createDiagnosisM, deleteDiagnosisM, allDiagnosis, updateDiagnosism, updateDiagnosismPushExercise, updateDiagnosismPushExercise1, getDiagnosisId} = require("../../controllers/diagnosism/controllers.diagnosism")


router.post("/creatediagnosism", createDiagnosisM)
router.delete("/deletediagnosism/:id", deleteDiagnosisM)
router.get("/getalldiagnosism", allDiagnosis)
router.get("/getdiagnosismid/:id", getDiagnosisId)
router.put("/updatediagnosism/:id", updateDiagnosism)
router.post("/updatediagnosismexercise/:id", updateDiagnosismPushExercise)
router.post("/updatediagnosismexercise1/:id", updateDiagnosismPushExercise1)




module.exports = router