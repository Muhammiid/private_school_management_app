//import mongoose module
const mongoose = require("mongoose");
//create user schema (attributes and types)
const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phoneNumber:String,
    childPhoneNumber:String,
    speciality:String,
    role:String,
    statut:String,
    photo:String,
    cv:String,
    teacherCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    studentCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
});
//create model and effectr to matchShema
const user = mongoose.model("User",userSchema);
//export user (to be importable)
module.exports=user;