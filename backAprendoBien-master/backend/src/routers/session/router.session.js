const {Router}= require("express")
const router = Router()
const {createSession} = require("../../controllers/session/controllers.session")





router.post("/createsession", createSession )




module.exports = router