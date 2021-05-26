const {Router} = require("express")
const router = Router()
const {createStage, getStage, updateStageDescription, updateStageImage, deleteStage} = require("../../controllers/stage/stage")



router.post('/createstage', createStage)
router.get('/allstages', getStage)
router.put('/updatedescription/:id', updateStageDescription)
router.put('/updateimage/:id', updateStageImage)
router.delete('/deletestage/:id', deleteStage)


module.exports = router