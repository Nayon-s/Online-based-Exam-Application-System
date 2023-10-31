const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema=new Schema({
    name:{
        type: String,
        required: true
    }, 
     classRoll:{
        type: Number, 
        required: true
    },
    registrationNo:{
        type: Number,
        required: true
    },
   
    email:{ 
        type: String,
        required: true,
        unique: true
    },
    mobileNo:{
        type: String,
        required: true
    }, 
    dateOfBirth:{
        type: String,
        required: true
    }, 
    fatherName:{
        type: String,
        required: true
    }, 
    motherName:{
        type: String,
        required: true
    }, 
    nationality:{
        type: String,
        required: true
    }, 
    religion:{
        type: String,
        required: true
    },
    batch:{
        type: Number,
        required: true
    },
    department:{
        type: String,
        required: true
    },
     
    hallName:{
        type: String,
        required: true
    }

})
module.exports=mongoose.model('students',studentSchema)