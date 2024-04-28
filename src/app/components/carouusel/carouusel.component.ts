import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-carouusel',
  templateUrl: './carouusel.component.html',
  styleUrls: ['./carouusel.component.css']
})
export class CarouuselComponent implements OnInit {
  courses:any=[];
  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getAllCourses().subscribe((data)=>{
      this.courses=data.courses
      console.log(this.courses)
  })
  }

}
