import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';


@Component({
  selector: 'app-course-tab',
  templateUrl: './course-tab.component.html',
  styleUrls: ['./course-tab.component.css']
})
export class CourseTabComponent implements OnInit {
  courses:any;
  constructor(private courseService:CourseService,private router:Router
    ) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((result)=>{
      console.log('here result',result.courses)
      this.courses=result.courses
  })
  }
  goToCourseInfo(_id:any){
    this.router.navigate([`app-course-info/${_id}`]);
  }
  goToEditCourse(_id:any){
    this.router.navigate([`app-edit-info-course/${_id}`]);

  }
}
