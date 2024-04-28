import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { TeachersTabComponent } from './components/teachers-tab/teachers-tab.component';
import { StudentTabComponent } from './components/student-tab/student-tab.component';
import { CourseTabComponent } from './components/course-tab/course-tab.component';
import { ParentTabComponent } from './components/parent-tab/parent-tab.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AddCourseTeacherComponent } from './components/add-course-teacher/add-course-teacher.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { EditInfoStudentComponent } from './components/edit-info-student/edit-info-student.component';
import { TeacherInfoComponent } from './components/teacher-info/teacher-info.component';
import { EditInfoTeacherComponent } from './components/edit-info-teacher/edit-info-teacher.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { EditInfoCourseComponent } from './components/edit-info-course/edit-info-course.component';
import { ParentInfoComponent } from './components/parent-info/parent-info.component';
import { MystudentsComponent } from './components/mystudents/mystudents.component';
import { DashboardStudentComponent } from './components/dashboard-student/dashboard-student.component';
import { DashboardParentComponent } from './components/dashboard-parent/dashboard-parent.component';
import { CourseComponent } from './components/course/course.component';
import { CarouuselComponent } from './components/carouusel/carouusel.component';
import { NextDirective } from './components/carouusel/next.directive';
import { PrevDirective } from './components/carouusel/prev.directive';
import { TeacherComponent } from './components/teacher/teacher.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CoursesComponent,
    TeachersComponent,
    HomeComponent,
    DashboardAdminComponent,
    TeachersTabComponent,
    StudentTabComponent,
    CourseTabComponent,
    ParentTabComponent,
    SignupFormComponent,
    LoginComponent,
    AddCourseTeacherComponent,
    TeacherDashboardComponent,
    StudentInfoComponent,
    EditInfoStudentComponent,
    TeacherInfoComponent,
    EditInfoTeacherComponent,
    CourseInfoComponent,
    EditInfoCourseComponent,
    ParentInfoComponent,
    MystudentsComponent,
    DashboardStudentComponent,
    DashboardParentComponent,
    CourseComponent,
    CarouuselComponent,
    NextDirective,
    PrevDirective,
    TeacherComponent,
    AllCoursesComponent,
  ],
  imports: [BrowserModule,FormsModule,AppRoutingModule,ReactiveFormsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
