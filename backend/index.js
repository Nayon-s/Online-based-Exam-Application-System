const connection=require('./database.js')
connection()

const express = require('express') 
const app = express() 
const port = 5000

var cors = require('cors')
app.use(cors())
app.use(express.json())

const SSLCommerzPayment = require('sslcommerz-lts')
const students = require('./models/students.js')
const applicants = require('./models/applicants.js')
const store_id = 'heybu64d3e43c0fdd4'
const store_passwd = 'heybu64d3e43c0fdd4@ssl'
const is_live = false 
const PDFDocument = require('pdfkit');

app.use('/api/auth', require('./routes/authenticate.js'))
app.use('/api/exam', require('./routes/exams.js'))

app.post('/done',async(req,res)=>{
  const student= await students.find({registrationNo: req.body.registrationNo})
  console.log(student)
  
   console.log(req.body)
  // const {details}= req.body
  // console.log(details)
  const timestamp = new Date().getTime();
  const x= "trxID" +  timestamp;
console.log(timestamp)
  const data = {
    total_amount: req.body.total_amount,
    currency: 'BDT',
           tran_id: x, 
           registrationNo:req.body.registrationNo,
           classRoll:req.body.classRoll,
           name:req.body.name,
           department:req.body.department,
           batch: req.body.batch,

     success_url: 'http://localhost:5000/success',
    fail_url: 'http://localhost:5000/fail',
    cancel_url: 'http://localhost:5000/cancel',
    ipn_url: 'http://localhost:3030/ipn',
    shipping_method: 'Courier',
    product_name: 'Computer.',
    product_category: 'Electronic',
    product_profile: 'general',
    cus_name: 'Customer Name', 
    cus_email: 'customer@example.com',
    cus_add1: 'Dhaka',
    cus_add2: 'Dhaka',
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: '01711111111',
    cus_fax: '01711111111',
    ship_name: 'Customer Name',
    ship_add1: 'Dhaka',
    ship_add2: 'Dhaka',
    ship_city: 'Dhaka',
    ship_state: 'Dhaka',
    ship_postcode: 1000,
    ship_country: 'Bangladesh',
};
// console.log(data) 
const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
sslcz.init(data).then(apiResponse => {
    let GatewayPageURL = apiResponse.GatewayPageURL
    res.send({url:GatewayPageURL})
    // console.log('Redirecting to: ', GatewayPageURL)
}); 

  app.post('/success', async (req,res)=>{
    console.log(data) 
    console.log(student)
    // data.paymentStatus = true;
    const update=await applicants.updateOne({
      registrationNo: data.registrationNo
    },
    {
      $set:{
        department: student.department,
    batch: "49",
    name: student.name,
    classRoll: student.classRoll,
    registrationNo: student.registrationNo,
    paymentStatus:"true"
      } 
    }, {upsert: false}    
     
    
    )
    
     console.log(update)
     try {
       const student = await applicants.findOne({ registrationNo: data.registrationNo });
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      const PDFDocument = require('pdfkit');
      const doc = new PDFDocument(); 
  
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="admitCard.pdf"`);
  
      doc.pipe(res);
  
       doc.fontSize(20).text('Jahangirnagar University', {align:'center' });
       doc.moveDown(0.8)
       doc.fontSize(18).text('Admit Card', {align:'center'});
       doc.moveDown(1)

      doc.fontSize(12).text(`Name: ${student.name}`);
      doc.moveDown(0.5)
      
      doc.text(`Batch: ${student.batch}`);
      doc.moveDown(0.5)
      doc.text(`Department: ${student.department}`);
      doc.moveDown(0.5)
      doc.text(`Exam Roll: 20${student.classRoll}`);
      doc.moveDown(0.5)
      doc.text(`Registration No: ${student.registrationNo}`);
      doc.end();
   
    } catch (error) {
      console.error('Error generating PDF:', error);
      res.status(500).json({ error: 'Error generating PDF' });
    }
  


   

  })

  
  
  

  app.post('/fail',async(req,res)=>{
    await applicants.deleteOne({registrationNo: data.registrationNo });
    res.redirect('http://localhost:3000/student/profile')
  })
   

  app.post('/cancel',async(req,res)=>{
    await applicants.deleteOne({registrationNo: data.registrationNo });

    res.redirect('http://localhost:3000/student/profile')
  })
})  

app.listen(port, () => { 
  console.log(`App listening on port ${port}`)
}) 