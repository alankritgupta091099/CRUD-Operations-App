require('./models/db');

const express= require('express');
const app= express();
const exphbs=require('express-handlebars');
const path=require('path');
const bodyParser=require('body-parser');

const form=require('./form');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('views',path.join(__dirname,'/views/'));
app.engine('handlebars',exphbs({
    defaultLayout:'main'
}));
app.set('view engine','handlebars');



app.listen(8080,()=>{
    console.log('server started at port: ',8080);
});
app.use('/form',form);