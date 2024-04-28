const mongoose = require("mongoose");
const notesSchema = mongoose.Schema({
  phoneNumber: Number,
  note: Number,
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});
const notes = mongoose.model("Notes",notesSchema);
module.exports = notes;
