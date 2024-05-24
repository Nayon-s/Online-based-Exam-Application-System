const express = require('express') 
const { body, validationResult } = require('express-validator');
const applications = require('../models/applications');
 const applicants = require('../models/applicants');
const courses=require('../models/courses');
const router=express.Router() 


 
router.post('/courselist', async (req, res) => {
  try {
    const course = await courses.findOne({
      department: req.body.department,
      year: req.body.year,
      semester: req.body.semester
    });
  
    if (course) {
      const courseCodes = course.courseList.map(course => course.courseCode);
      res.json(courseCodes);
    } else {
      res.status(404).json({ message: 'Course list not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.get('/examlists', async (req,res)=>{
  const currentDate = new Date().toISOString().split('T')[0];
  const application = await applications.find({
    startingDate: { $lte: currentDate },
    endingDate: { $gte: currentDate }
  });
 
    res.json(application)

})    
 
router.post('/examlistStudent', async (req,res)=>{
  const currentDate = new Date().toISOString().split('T')[0];
  const application = await applications.find({
    startingDate: { $lte: currentDate },
    endingDate: { $gte: currentDate },
    department:req.body.department,
    batch:req.body.batch
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
    // console.log(req.body)

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