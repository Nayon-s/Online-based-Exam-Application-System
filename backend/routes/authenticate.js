const express = require('express') 
const students = require('../models/students')
const { body, validationResult } = require('express-validator');

// const bcrypt = require('bcryptjs'); 

const router=express.Router()
router.post('/adduser',(req,res)=>{
    const student=students(req.body)  
    student.save()
    res.json(req.body)  
 
})
router.post('/login', [
    body('registrationNo', "Enter a valid Registration No.").isLength({min:11}),
    body('email', "Enter a valid Email").isEmail()
 
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const {email, registrationNo}=req.body
      try {
        const student= await students.findOne({registrationNo, email})
        if(!student){
        return res.status(400).json({ error: 'Student not found' });
        }
        
        res.json({student,"status":"Success"});
      } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Server error' })
      }
    
})
 
// router.get('/userinfo/:registrationNo', async (req, res) => {
//   try {
//     const registrationNo = req.params.registrationNo;
//     const user = await students.findOne({ registrationNo });

//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// }); 



module.exports=router                       