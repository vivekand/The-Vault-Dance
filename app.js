// import express module 
const express =require("express");
const path=require('path')
const app=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser") // no use 
const port=8000;

mongoose.set('strictQuery', true); 

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
  
}

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

const contact = mongoose.model('contact', contactSchema); 


app.use('/static',express.static('static')); // for serving static file
// PUG SPECIFIC PUG

app.use(express.urlencoded())
app.set('view engine', 'pug') // set the template engine as pug
app.set('views',path.join(__dirname,'views')); // set the view directory 
// END POINT 
app.get('/',(req,res)=>{
    const param ={ }
    res.status(200).render('home.pug');
})
app.get('/contact',(req,res)=>{

    res.status(200).render('contact.pug');
})
app.post('/contact',(req,res)=>{
    
    var myData= new contact(req.body);
    myData.save().then(()=>{
        res.send("Form has been submitted")
    }).catch(()=>{
        res.status(400).send("Faield")
    })
})






// START THE SERVER 
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})