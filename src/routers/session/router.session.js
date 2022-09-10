const {Router}= require("express")
const router = Router()
const {createSession, getExerciseForIdStudents, getSevenExercises, getAllSessionsForIdStudents, getPathImageUrl, allSessions, totalSessions, allSessionsbyStudent} = require("../../controllers/session/controllers.session")


router.get("/getpath/:ids/:idb", getPathImageUrl )
router.get("/totalsessions", totalSessions )
router.get("/getallsessions/:id", getAllSessionsForIdStudents )
router.get("/allsessionsbystudent/:id", allSessionsbyStudent )
router.get("/getsevenexercises/:id", getSevenExercises )
router.post("/createsession/:id", createSession )
router.get("/getprogress/:id/:num2/:iduser", getExerciseForIdStudents )
router.get("/allsessions", allSessions )




module.exports = router