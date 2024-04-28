import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CourseService } from 'src/app/services/course.service';
import { NoteService } from 'src/app/services/note.service';

interface Course {
  // Define the structure of your Course object
  _id: string;
  teacherId: string;
  coursename: string;
  coursePeriode: string;
  // Add other properties as per your API response
}
interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  note?: number; // Make sure to define the type of the 'note' property
}

@Component({
  selector: 'app-mystudents',
  templateUrl: './mystudents.component.html',
  styleUrls: ['./mystudents.component.css'],
})
export class MystudentsComponent implements OnInit {
  tab: any = []; // Initialize as an empty array of Course objects
  decodedToken: any; // Consider defining a type for decodedToken
  _id: any;
  teacherId: any;
  msg:string="";
  constructor(
    private courseService: CourseService,
    private activatedRoute: ActivatedRoute,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');

    const token: string | null = sessionStorage.getItem('token'); // Ensure token is of type string

    if (token) {
      this.decodedToken = jwtDecode(token);
    }

    if (this._id) {
      this.courseService.getCourseByID(this._id).subscribe({
        next: (data) => {
          this.tab = data.obj.students;
          this.teacherId = data.obj.teacherId;
          this.tab.forEach((student: Student) => {
            this.fetchAndAssignStudentNote(student); // Fetch and assign notes for each student
          });
        },
      });
    }
  }
  fetchAndAssignStudentNote(student: Student): void {
    this.noteService.getNoteByStudentId(student._id).subscribe({
      next: (note: any) => {
        let val = note.note;
        student.note = val || 0; // Assign the fetched note to the student, or default to 0 if note is falsy
      },
    });
  }

  saveNotes(studentId: any, phoneNumber: any, note: number) {
    let noteobj = {
      studentId: studentId,
      phoneNumber: phoneNumber,
      note: note,
      courseId: this._id,
    };
    this.noteService.addNote(noteobj).subscribe((data) => {
      this.msg=data.msg
    });
  }
}
