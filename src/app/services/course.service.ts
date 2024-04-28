import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  courseURL: string = 'http://localhost:3000/courses';

  constructor(private httpClient: HttpClient) {}

  getAllCourses() {
    return this.httpClient.get<{ courses: any }>(this.courseURL);
  }
  getCourseByID(_id: any) {
    return this.httpClient.get<{ obj: any; msg: any }>(
      `${this.courseURL}/${_id}`
    );
  }
  getCoursesByID(_id: any) {
    return this.httpClient.get<{ courses: any; msg: any; error: any }>(
      `http://localhost:3000/courses/byTeacher/${_id}`
    );
  }

  deleteCourseByID(_id: number) {
    return this.httpClient.delete<{ msg: string; isDeleted: boolean }>(
      `${this.courseURL}/${_id}`
    );
  }
  addCourse(m: any,data:File) {
    let fData = new FormData();
    fData.append('coursename',m.coursename)
    fData.append('coursePeriode',m.coursePeriode)
    fData.append('Description',m.Description)
    fData.append('teacherId',m.teacherId)

    fData.append('data',data)
    return this.httpClient.post<{ msg: string }>(this.courseURL,fData);
  }
  editCourse(obj: any) {
    return this.httpClient.put<{ msgOne: boolean; msgTwo: boolean }>(
      this.courseURL,
      obj
    );
  }
}
