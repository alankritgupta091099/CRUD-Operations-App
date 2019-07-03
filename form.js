const express= require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Student=mongoose.model('Student');

router.get('/',(req,res)=>{
    res.render("form",{
        title: "Form"
    });
});

router.post('/',(req,res)=>{
    if(req.body._id=='')
        insertRecord(req,res);
    else
        updateRecord(req,res);
});

function insertRecord(req,res){
    var student=new Student();
    student.name=req.body.name;
    student.rollNumber=req.body.rollNumber;
    student.class=req.body.class;
    student.save((err,doc)=>{
        if(!err)
            res.redirect('/form/list');
        else{
            if(err.name=='ValidationError'){
                handleValidationError(err,req.body);
                res.render("form",{
                    title: "Form",
                    student:req.body
                });
            }
            else
                console.log('Error occured: '+err);
        }
    });
}
function updateRecord(req,res){
    Student.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('form/list');
        }
        else{
            if(err.name=='ValidationError')   {
                handleValidationError(err,req.body);
                res.render('form',{
                    title:"Update Data",
                    student:req.body
                });
            }
            else{
                console.log('Error during Update record'+err);
            }
        }
    });
}
router.get('/list',(req,res)=>{
    Student.find((err,doc)=>{
        if(!err){
            res.render("list",{
                list:doc
            });
        }
        else{
            console.log('Error Retreiving Data: '+err);
        }
    });
});

function handleValidationError(err,body){
    for(field in err.errors)
    {
        switch(err.errors[field].path){
            case 'name':
                body['nameError']=err.errors[field].message;
            case 'rollNumber':
                body['rollNumberError']=err.errors[field].message;
        }
    }
}
router.get('/:id',(req,res)=>{
    Student.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("form",{
                title:'Update Data',
                student:doc
            });
        }
    });
});
router.get('/delete/:id',(req,res)=>{
    Student.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/form/list');
        }
        else{
            console.log("Error :"+err);
        }
    });
});
module.exports=router;