const {Router} = require("express")
const router = Router()
const {allExercise, createExercise, createExerciseWithImage, updateExercise, updateExerciseWithImage,updateExerciseSolution, deleteExercise} = require("../../controllers/exercise/exercise")




router.get('/allexercises', allExercise)
//router.post('/createexercise', createExercise)
router.post('/createexercisewithimage', createExerciseWithImage)
//router.put('/updateexercise/:id', updateExercise)
router.put('/updateexercisewithimage/:id', updateExerciseWithImage)
router.put('/updateexercisesolution/:id', updateExerciseSolution)
router.delete('/deleteexercise/:id', deleteExercise)



module.exports = router