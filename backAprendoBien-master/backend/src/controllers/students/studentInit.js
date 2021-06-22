const jwt = require("jsonwebtoken")
const STUDENTS = require("../../models/students/students")
const ctrls = {}

ctrls.verify =async (req, res)=>{
    
   
    try {
        const { authorization } = req.headers;
       
        if (!authorization) {
          return  res.json({ message: 'Authorization token missing' });
        }
    
        const accessToken = authorization.split(' ')[1];
        const { _id} = jwt.verify(accessToken, "aprender");
        const user =await STUDENTS.findOne({_id:_id});
      
        if (!user) {
          return  res.json({ message: 'Invalid authorization token' });
        }
        res.json({user})
      } catch (error) {
        return res.json ({ message: 'Internal server error' });
      }
      
}





module.exports = ctrls