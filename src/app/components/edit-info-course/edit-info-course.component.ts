import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-info-course',
  templateUrl: './edit-info-course.component.html',
  styleUrls: ['./edit-info-course.component.css']
})
export class EditInfoCourseComponent implements OnInit {
  editCourseForm!:FormGroup;
  course:any;
  _id:any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    if (this._id) {
      console.log( this._id)
      this.courseService.getCourseByID(this._id).subscribe((data) => {
        console.log(data.obj)
        this.course=data.obj
      });
    }
  }
  validate() {   
    console.log(this.course);
    this.courseService.editCourse(this.course).subscribe({
      next:(response: any) => {
        console.log(response.msg);
        this.router.navigate(['app-dashboard-admin']);
      }
    });
  }
}
