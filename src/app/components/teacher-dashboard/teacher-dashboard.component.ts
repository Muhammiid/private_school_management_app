import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { jwtDecode } from 'jwt-decode';
import { ActivatedRoute, Route, Router } from '@angular/router';

interface Course {
  // Define the structure of your Course object
  _id: string;
  teacherId: string;
  coursename: string;
  coursePeriode: string;
  // Add other properties as per your API response
}

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent implements OnInit {
  tab: any; // Initialize as an empty array of Course objects
  decodedToken: any; // Consider defining a type for decodedToken
  constructor(private courseService: CourseService,private router: Router
    ) {}

  ngOnInit(): void {

    const token: string | null = sessionStorage.getItem('token'); // Ensure token is of type string

    if (token) {
      this.decodedToken = jwtDecode(token);
    }

    if (this.decodedToken) {
      this.courseService.getCoursesByID(this.decodedToken._id).subscribe({
        next: (data) => {
          this.tab = data.courses
          console.log(this.tab);
        }
      });
    }
  }
  goToStudents(_id:any){
    this.router.navigate([`app-mystudents/${_id}`]);
  }
}
