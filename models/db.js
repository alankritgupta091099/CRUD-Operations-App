const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/StudentDB',{useNewUrlParser:true},err=>{
    if(!err)
        console.log('Mongoose DB connected');
    else
        console.log('Error occured'+err);
});

require('./student.model');