const {Router} = require("express")
const router = Router()
const {allExercise, createExercise, createExerciseWithImage, updateExercise, updateExerciseWithImage,updateExerciseSolution, deleteExercise, allExercisesBlok, exerciseForBlock} = require("../../controllers/exercise/exercise")



router.get('/allexercisesforblock/:id', exerciseForBlock)
router.get('/allexercises', allExercise)
//router.post('/createexercise', createExercise)
router.get('/allexercisesblock/:n/:id', allExercisesBlok)
router.post('/createexercisewithimage', createExerciseWithImage)
//router.put('/updateexercise/:id', updateExercise)
router.put('/updateexercisewithimage/:id', updateExerciseWithImage)
router.put('/updateexercisesolution/:id', updateExerciseSolution)
router.delete('/deleteexercise/:id', deleteExercise)



module.exports = router