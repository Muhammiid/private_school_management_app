//import mongoose module
const mongoose = require("mongoose");
//create user schema (attributes and types)
const courseSchema = mongoose.Schema({
  coursename: String,
  coursePeriode: String,
  Description: String,
  photo:String,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  students:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
}],
  
});
//create model and effectr to matchShema
const course = mongoose.model("Course", courseSchema);
//export course (to be importable)
module.exports = course;
