const mongoose=require('mongoose');

var studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:'This field is required'
    },
    rollNumber:{
        type:String,
        required:'This field is required'
    },
    class:{
        type:String
    }
});

mongoose.model('Student',studentSchema);