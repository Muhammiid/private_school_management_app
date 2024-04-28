import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  student: any;
  courses: any;
  courseId: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    let _id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.userService.getUserByID(_id).subscribe({
      next: (response) => {
        this.student = response.obj;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  
    this.courseService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response.courses;
      },
      error: (error) => {
        console.error('Error fetching courses:', error);
      }
    });
  }
  selectCourse(event: any) {
    console.log("event", event.target.value);
    this.courseId = event.target.value;
  }

  affecteStudent() {
    this.userService.affecteUser(this.student._id,this.courseId).subscribe({
       next:(response)=>{
        console.error('here response', response);
      }
    })

  }
}

