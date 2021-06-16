const {Router}= require("express")
const router = Router()
const {createSession, getExerciseForIdStudents} = require("../../controllers/session/controllers.session")





router.post("/createsession/:id", createSession )
router.get("/getprogress/:id", getExerciseForIdStudents )




module.exports = router