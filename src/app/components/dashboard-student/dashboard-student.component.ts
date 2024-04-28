import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-dashboard-student',
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.css'],
})
export class DashboardStudentComponent implements OnInit {
  courses: any = [];
  decodedToken:any;
  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    const token: string | null = sessionStorage.getItem('token'); // Ensure token is of type string
    
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
    this.noteService.getcoursesbystudentId(this.decodedToken._id).subscribe((courses) => {
      if (courses) {
        this.courses = courses.courses;
        console.log(courses.courses)
      }
    });
  }
}
