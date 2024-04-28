import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent implements OnInit {
  courses:any=[]
  constructor(private courseService:CourseService ) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((result)=>{
      this.courses=result.courses
    })
  }

}
