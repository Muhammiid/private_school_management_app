//*****************Module importation*****************//
const express = require("express");
// importer le module body-parser
const bodyParser = require("body-parser");
//import mongoose module
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/privateshcool");

//*****************Exress application*****************//
// creates express application
const app = express();
// make app exportable
module.exports = app;
//*********************import bcrypt module********************** */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
//***************** app configuration ( la configuration de l'application)*****************//
// send response with JSON format (envoyer le retour sous format Json)
app.use(bodyParser.json());
// get object from request (PUT,POST)
app.use(bodyParser.urlencoded({ extended: true }));
// Security configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, OPTIONS, PATCH, PUT"
  );
  next();
});
const secretKey = "your-secret-key";
app.use(
  session({
    secret: secretKey,
  })
);
app.use("/file", express.static(path.join("backend/uploads")));
const MIME_TYPE = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "application/pdf": "pdf",
};

const storageConfig = multer.diskStorage({
  // destination
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE[file.mimetype];
    if (isValid) {
      cb(null, "backend/uploads");
    }
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const extension = MIME_TYPE[file.mimetype];
    const imgName = name + "-" + Date.now() + "-crococoder-" + "." + extension;
    cb(null, imgName);
  },
});

//**********************models importation***************//
const User = require("./models/user");
const Course = require("./models/course");
const Notes = require("./models/notes");

//***************** busness Logic (traitement logique)*****************//
app.post("/users/signup", multer({ storage: storageConfig }).fields([{ name: 'data', maxCount: 1 }, { name: 'cv', maxCount: 1 }]), (req, res) => {
  console.log("Here into BL: add user ", req.body,req.files);

  if (req.body.role == "parent") {
      User.findOne({ phoneNumber: req.body.childPhoneNumber }).then((checked) => {
          if (checked) {
              User.findOne({ phoneNumber: req.body.phoneNumber }).then((checkedPhone) => {
                  if (!checkedPhone) {
                      bcrypt.hash(req.body.password, 10).then((dataCrypted) => {
                          console.log(dataCrypted);
                          req.body.password = dataCrypted;
                          let newuser = new User(req.body);
                          newuser.save().then(() => {
                              res.json({ msg: "User added with success" });
                              console.log(newuser);
                          });
                      });
                  } else {
                      res.json({ msg: "Your child phone not found" });
                  }
              });
          }
      });
  } else {
      User.findOne({ phoneNumber: req.body.phoneNumber }).then((isFound) => {
          if (isFound) {
              res.json({ msg: "Your phone exists" });
          } else {
              bcrypt.hash(req.body.password, 10).then((cryptedPassword) => {
                  console.log(cryptedPassword);
                  req.body.password = cryptedPassword;
                  if (req.body.role === "student") {
                      req.body.photo = `http://localhost:3000/file/${req.files['data'][0].filename}`;
                      console.log(req.body);
                  } else if (req.body.role === "teacher") {
                      req.body.cv = `http://localhost:3000/file/${req.files['cv'][0].filename}`;
                      req.body.photo = `http://localhost:3000/file/${req.files['data'][0].filename}`;
                      req.body.statut = "NotOK"; // Set the 'statut' property here
                      console.log(req.body);
                  }
                  let newuser = new User(req.body);
                  newuser.save().then(() => {
                      res.json({ msg: "User added with success" });
                      console.log(newuser);
                  });
              });
          }
      });
  }
});


app.post("/users/login", (req, res) => {
  console.log("Here into BL:connecteuser", req.body);

  // Find the user by email
  User.findOne({ phoneNumber: req.body.phoneNumber }).then((doc) => {
    // If no user found with the provided phoneNumber
    if (!doc) {
      res.json({ msg: "Please verify your phone Number" });
    }else if(doc.statut=="NotOK") {
      res.json({ msg: "you are not OK" });
      
    }else{
    // Compare the password
    bcrypt.compare(req.body.password,doc.password).then((pwdResult) => {
      console.log("pwdResult", pwdResult);
      if (!pwdResult) {
        // If passwords don't match
        res.json({ msg: "Please check your password" });
      } else {
        const token = jwt.sign(
          {
            role: doc.role,
            firstName: doc.firstName,
            lastName: doc.lastName,
            _id: doc._id,
          },
          secretKey,
          { expiresIn: "1h" }
        );
        console.log("here into token", token);
        res.json({ msg: "welcome", token: token });
      }
    })};
  });
});

app.get("/users", (req, res) => {
  console.log("Here into BL:getAllUsers ");
  User.find().then((docs) => {
    res.json({ users: docs });
  });
});
app.get("/users/:_id", (req, res) => {
  console.log("Here into BL: getuserByID");
  let _id = req.params._id;
  console.log(_id);
  User.findById(_id).then((doc) => {
    if (doc) {
      res.json({ obj: doc });
    } else {
      res.json({ msg: "not found" });
    }
  });
});
app.put("/users/edit", (req, res) => {
  console.log("Here into BL: edit user  ");

  User.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
    if (updateResponse.nModified) {
      res.json({ msg: true });
    } else {
      res.json({ msg: false });
    }
  });
});
// busness Logic deleteCourseByID
app.delete("/users/:_id", (req, res) => {
  console.log("Here into BL: deleteusereByID ");

  User.deleteOne({ _id: req.params._id }).then((deleteresponse) => {
    if (deleteresponse.deletedCount) {
      res.json({ isDeleted: true });
    } else {
      res.json({ isDeleted: false });
    }
  });
});

// affecte student  to course
app.get('/users/affecte/:studentId/:courseId', (req, res) => {
  console.log('Adding student to course is running...');

  let courseId = req.params.courseId;
  let studentId = req.params.studentId;

  Course.findById(courseId).then((docCourse) => {
    if (docCourse && !isStudentAlreadyAssigned(docCourse, studentId)) {
      User.findById(studentId).then((docStudent) => {
        if (docStudent) {
          console.log(docCourse, docStudent);
          docStudent.studentCourses.push(docCourse);
          docCourse.students.push(docStudent);
          docStudent.save().then(() => {
            docCourse.save().then(() => {
              res.json({ isAdded: true });
            });
          });
        } else {
          res.json({ isAdded: false, error: 'Student not found' });
        }
      });
    } else {
      res.json({ isAdded: false, error: 'Course not found or student already assigned' });
    }
  });
});

function isStudentAlreadyAssigned(course, studentId) {
  for (let student of course.students) {
    if (student._id.toString() === studentId) {
      return true;
    }
  }
  return false;
}



//*******************************************************************************
// busness Logic pour courses//
//********************************************************************************

app.get("/courses", (req, res) => {
  console.log("Here into BL: getAllCourses ");
  Course.find()
    .populate("students").populate("teacherId") 
    .then((docs) => {
      res.json({ courses: docs });
    });
});

// busness Logic afficher un objet selon l'id   (:x car il est dynamique)
app.get("/courses/:_id", (req, res) => {
  console.log("Here into BL: getcourseByID");
  let _id = req.params._id;
  Course.findById(_id)
    .populate("students")
    .then((doc) => {
      if (doc) {
        res.json({ obj: doc });
      } else {
        res.json({ msg: "not found" });
      }
    });
});
// busness Logic afficher un objet selon l'id du teacher

app.get("/courses/byTeacher/:teacherId", (req, res) => {
  console.log("Here into BL: getCoursesByTeacherID");
  let teacherId = req.params.teacherId;
  Course.find({ teacherId: teacherId })
    .then((docs) => {
      if (docs.length > 0) {
        res.json({ courses: docs });
      } else {
        res.json({ msg: "No courses found for the given teacherId" });
      }
    })
    .catch((err) => {
      console.error("Error finding courses by teacherId:", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// busness Logic deleteCourseByID
app.delete("/courses/:_id", (req, res) => {
  console.log("Here into BL: deleteCourseByID ");

  Course.deleteOne({ _id: req.params._id }).then((deleteresponse) => {
    if (deleteresponse.deletedCount) {
      res.json({ isDeleted: true });
    } else {
      res.json({ isDeleted: false });
    }
  });
});
// busness Logic pour addcourse
app.post("/courses",multer({ storage: storageConfig }).single("data"), (req, res) => {
  console.log("Here into BL: addCourse",req.body);
  User.findById(req.body.teacherId).then((teacherObj) => {
    if (teacherObj) {
      let courseObj = new Course({
        coursename: req.body.coursename,
        coursePeriode: req.body.coursePeriode,
        Description: req.body.Description,
        teacherId: teacherObj._id,
        photo:`http://localhost:3000/file/${req.file.filename}`,

      })
      courseObj.save((err, doc) => {
        if (err) {
          console.error("Error saving course:", err);
          res.json({ msg: "course not saved" });
        } else {
          teacherObj.teacherCourses.push(courseObj);
          teacherObj.save((err) => {
            if (err) {
              res.json({ msg: "course saved but teacher not updated" });
            } else {
              res.json({ msg: "course added with success" });
            }
          });
        }
      });
    } else {
      res.json({ msg: "teacher not found" });
    }
  });
});

// busness Logic pour la requette  editcourse
app.put("/courses", (req, res) => {
  console.log("Here into BL: edit course  ");

  Course.updateOne({ _id: req.body._id }, req.body).then((updateResponse) => {
    if (updateResponse.nModified) {
      res.json({ msgOne: true });
    } else {
      res.json({ msgTwo: false });
    }
  });
});

//********************************************************************************
// busness Logic pour notes//
//********************************************************************************

//add note to student

app.post("/notes/", async (req, res) => {
  const obj = req.body;

  try {
    let foundNote = await Notes.findOne({
      phoneNumber: obj.phoneNumber,
      courseId: obj.courseId,
    });

    if (foundNote) {
      const updateResponse = await Notes.updateOne({ _id: foundNote._id }, obj);
      if (updateResponse.nModified) {
        return res.json({ msg: ": Note updated" });
      } else {
        return res.json({ msg: ": Note not updated " });
      }
    }

    const student = await User.findOne({ phoneNumber: obj.phoneNumber });
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const course = await Course.findById(obj.courseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const teacher = await User.findById(course.teacherId);
    if (!teacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    let newNote = new Notes({
      phoneNumber: obj.phoneNumber,
      note: obj.note,
      studentId: obj.studentId,
      courseId: obj.courseId,
    });

    await newNote.save();
    console.log("Note saved successfully");
    res.json({ msg: "Note saved successfully" });
  } catch (err) {
    console.error("Error processing request:", err);
    res.status(500).json({ msg: "Internal server error" });
  }
});

app.get("/notes/:_id", (req, res) => {
  console.log("Here into BL: find by student Id ");
  let studentId = req.params._id;
  Notes.findOne({ studentId: studentId }).then((doc) => {
    if (doc) {
      // Document found, return its note property
      res.json({ note: doc.note || 0 });
    } else {
      // Document not found, return a message indicating that no note is available
      res.json({ note: 0 });
    }
  });
});

app.get("/notes/studentcourses/:_id", (req, res) => {
  console.log("Here into BL: student courses ");
  let studentId = req.params._id;
  Notes.find({ studentId: studentId }).populate([{ path: 'courseId', populate: { path: 'teacherId' } }, 'studentId'])
  .then((docs) => {
    if (docs) {
      // Document found, return its note property
      res.json({ courses: docs});
    } else {
      // Document not found, return a message indicating that no note is available
      res.json({ msg:"no courses found " });
    }
  });
});
app.get("/notes/studentcoursesbyphone/:childPhoneNumber", (req, res) => {
  console.log("Here into BL: student courses by phone ");
  let childPhoneNumber = req.params.childPhoneNumber;
  Notes.find({ phoneNumber: childPhoneNumber }).populate([{ path: 'courseId', populate: { path: 'teacherId' } }, 'studentId'])
  .then((docs) => {
    if (docs) {
      // Document found, return its note property
      res.json({ courses: docs});
    } else {
      // Document not found, return a message indicating that no note is available
      res.json({ msg:"no courses found " });
    }
  });
});
