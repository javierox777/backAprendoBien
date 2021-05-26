const {Router} = require("express")
const router = Router()
const {getBlock, createBlock, deleteBlock, updateBlockImage, getBlockIdStage} = require("../../controllers/block/controllers.block")




router.get('/allblocks', getBlock)
router.post('/createblock', createBlock)
router.delete('/deleteblock/:id', deleteBlock)
router.put('/updateblock/:id', updateBlockImage)
router.get('/allblocksidstage/:id', getBlockIdStage)



module.exports = router