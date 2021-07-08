const {Router}= require("express")
const router = Router()
const {createSession, getExerciseForIdStudents, getSevenExercises, getAllSessionsForIdStudents} = require("../../controllers/session/controllers.session")



router.get("/getallsessions/:id", getAllSessionsForIdStudents )
router.get("/getsevenexercises/:id", getSevenExercises )
router.post("/createsession/:id", createSession )
router.get("/getprogress/:id", getExerciseForIdStudents )




module.exports = router