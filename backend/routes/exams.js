const express = require('express') 
const { body, validationResult } = require('express-validator');
const applications = require('../models/applications');
 const applicants = require('../models/applicants');

const router=express.Router() 
 

router.get('/examlists', async (req,res)=>{
  const currentDate = new Date().toISOString().split('T')[0];
  const application = await applications.find({
    startingDate: { $lte: currentDate },
    endingDate: { $gte: currentDate }
  });

    res.json(application)

})
router.post('/findstudent', async (req,res)=>{
    const student=await applicants.findOne({registrationNo: req.body.registrationNo})
    res.json(student) 

}) 
router.post('/createexam',(req,res)=>{
    const application=applications(req.body)
    application.save()
    res.json(req.body)

})
router.post('/addapplicants', async (req,res)=>{
        
        // const applicant=await applicants(req.body)
        // applicant.save()
        // res.json(req.body)  
          
        try {
            const registrationNo = req.body.registrationNo;
            console.log('Checking for registration number:', registrationNo);
        
            const check = await applicants.findOne({ registrationNo });
        
            if (check === null) {
              const applicant = new applicants(req.body);
              await applicant.save();
              console.log('Student added:', req.body);
              res.json(req.body);
            } else {
              console.log('Applicant already exists:', registrationNo);
              res.status(400).json({ error: 'Student already exists' });
            }
          } catch (error) { 
            console.error('Error:', error);
            res.status(500).json({ error: 'An error occurred.' });
          }
        

    
  
}) 


  


 


module.exports=router                       