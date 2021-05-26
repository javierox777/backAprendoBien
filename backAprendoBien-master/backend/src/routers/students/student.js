const {Router} = require("express")
const router = Router()
const Auth = require("../../helper/auth")
const {signupStudent, loginStudents} = require("../../controllers/students/signup")
const {allStudents, idStudents, updateStudents, deleteStudents} = require("../../controllers/students/constrollers.students")
const {verify} = require("../../controllers/students/studentInit")




router.post('/signup',signupStudent )

router.post('/signin', loginStudents)
router.get('/allstudents', allStudents)
router.get('/idstudents/:id', idStudents)
router.put('/updatestudents/:id', updateStudents)
router.delete('/deletestudents/:id', deleteStudents)


router.get('/init', verify )






module.exports = router




