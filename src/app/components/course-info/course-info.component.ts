import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
course:any={};
  constructor(private activatedRoute: ActivatedRoute,
  
    private courseService: CourseService) { }

  ngOnInit(): void {
    let _id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.courseService.getCourseByID(_id).subscribe({
      next: (response) => {
        this.course = response.obj;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });

  }

}
