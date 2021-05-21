const mongoose=require('mongoose')

const Empschema=new mongoose.Schema({
    name:String,
    position:String,
    email:String,
    salary:String,
    phone:String,
    age:String,
    photo:String
})

mongoose.model("empschema",Empschema)