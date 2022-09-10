const {Router} = require("express")
const router = Router()
const {getBlock, createBlock, deleteBlock, updateBlockImage, getBlockIdStage, updateBlockDescription, totalBlocks} = require("../../controllers/block/controllers.block")




router.get('/allblocks', getBlock)
router.get('/totalblocks', totalBlocks)
router.post('/createblock', createBlock)
router.delete('/deleteblock/:id', deleteBlock)
router.put('/updateblock/:id', updateBlockImage)
router.put('/updatedescription/:id', updateBlockDescription)
router.get('/allblocksidstage/:id', getBlockIdStage)



module.exports = router