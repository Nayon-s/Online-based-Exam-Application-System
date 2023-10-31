
const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicantSchema=new Schema({
    
    department:{
        type: String, 
        required: true
    },
   
    batch:{
        type: String, 
        required: true
    } , 
    name:{
        type: String, 
        required: true
    },
    classRoll:{
        type: String, 
        required: true
    }
    ,
    registrationNo:{
        type: String, 
        required: true  
    } ,
    paymentStatus:{
        type: String, 
        required: true
    } 
    

})
module.exports=mongoose.model('applicants',applicantSchema)