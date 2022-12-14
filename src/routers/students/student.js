const {Router} = require("express")
const router = Router()
const Auth = require("../../helper/auth")
const {signupStudent, loginStudents, promedioResult} = require("../../controllers/students/signup")
const {allStudents, idStudents, updateStudents, deleteStudents, updatePassword, updatePhotoStudent, mediaStudents, allStudentsActivos, allStudentsInactivos} = require("../../controllers/students/constrollers.students")
const {verify} = require("../../controllers/students/studentInit")



router.get('/promresult/:id',promedioResult )
router.get('/mediastudents',mediaStudents )
router.post('/signup',signupStudent )
router.put('/updatepassword/:id', updatePassword)
router.put('/updatephotostudent/:id', updatePhotoStudent)
router.post('/signin', loginStudents)
router.get('/allstudents', allStudents)
router.get('/activos', allStudentsActivos)
router.get('/inactivos', allStudentsInactivos)
router.get('/idstudents/:id', idStudents)
router.put('/updatestudents/:id', updateStudents)
router.delete('/deletestudents/:id', deleteStudents)


router.get('/init', verify )






module.exports = router




