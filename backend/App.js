const express=require('express')
const app=express()
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
require('./Emp')

app.use(bodyparser.json())

const Emps=mongoose.model("empschema")

const mongourl="mongodb+srv://thawfiqsuhail:mohamedthawfiqsuhail@cluster0-nn53b.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongourl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected",()=>console.log("connected to Mongo"))

mongoose.connection.on("error",(err)=>console.log("Error occured",err))

app.get('/',(req,res)=>{
    Emps.find({})
    .then(data=>{
        console.log("All data's",data)
        res.send(data)
    }).catch(err=>console.log(err))
})

app.post('/send',(req,res)=>{
    const emps=new Emps({
        name:req.body.name,
        position:req.body.position,
        email:req.body.email,
        salary:req.body.salary,
        phone:req.body.phone,
        age:req.body.age,
        photo:req.body.photo
    })
    emps.save()
    .then(data=>{
        console.log("success uploading!",data)
        res.send(data)
    }).catch(err=>{console.log("error occured",err)})
})

app.post("/delete",(req,res)=>{
    Emps.findByIdAndRemove(req.body.id)
    .then(data=>{console.log(data) 
        res.send(data) 
    }).catch(err=>console.log("failed",err))
})

app.post("/update",(req,res)=>{
    Emps.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        position:req.body.position,
        email:req.body.email,
        salary:req.body.salary,
        phone:req.body.phone,
        age:req.body.age,
        photo:req.body.photo
    })
    .then(data=>{console.log(data)
        res.send(data)
    }).catch(err=>console.log("error",err))
})

app.listen(3500,console.log("server started"))