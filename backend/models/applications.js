
const mongoose = require('mongoose');
const { Schema } = mongoose;

const applicationSchema=new Schema({
    department:{
        type: String, 
        required: true
    },
    batch:{
        type: String,
        required: true
    }, 
    
    startingDate:{
        type: String,
        required: true
    }, 
    endingDate:{
        type: String,
        required: true
    },
    courseList:{
        type: [String],
        required: true
    }

})
module.exports=mongoose.model('applications',applicationSchema)