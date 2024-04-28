import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-add-course-teacher',
  templateUrl: './add-course-teacher.component.html',
  styleUrls: ['./add-course-teacher.component.css'],
})
export class AddCourseTeacherComponent implements OnInit {
  addCourseForm!: FormGroup;
  decodedToken: any;
  imagePreview:any;
  msg:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.addCourseForm = this.formBuilder.group({
      coursename: ['', Validators.required],
      coursePeriode: ['', Validators.required],
      Description: ['', Validators.required],
      data: [''], // Initialize img control,
    });

    let token: any = sessionStorage.getItem('token');

    if (token) {
      this.decodedToken = jwtDecode(token);
    }
  }
  addCourse() {
    console.log(this.addCourseForm.value);
    console.log(this.addCourseForm.value.data);

    this.addCourseForm.value.teacherId = this.decodedToken._id;
    this.courseService
      .addCourse(this.addCourseForm.value,this.addCourseForm.value.data)
      .subscribe((result) => {
        console.log('here result', result.msg);
        this.msg==result.msg
        this.router.navigate(['app-teacher-dashboard']);
      });
  }
  onImageSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length
    > 0) {
    const file = inputElement.files[0];
    this.addCourseForm.patchValue({ data: file });
    this.addCourseForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    }
    }
}
