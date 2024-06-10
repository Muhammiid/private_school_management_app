import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
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
import { TeachersComponent } from './components/teachers/teachers.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { NewcarouseledComponent } from './components/newcarouseled/newcarouseled.component';

const routes: Routes = [
  { path: '',redirectTo:'app-home',pathMatch:'full'},
  { path: 'app-home', component: HomeComponent },
  { path: 'app-signup-admin', component: SignupFormComponent },
  { path: 'app-signup-teacher', component: SignupFormComponent },
  { path: 'app-signup-student', component: SignupFormComponent },
  { path: 'app-signup-parent', component: SignupFormComponent },
  { path: 'app-login', component: LoginComponent },
  { path: 'app-add-course-teacher', component: AddCourseTeacherComponent },
  { path: 'app-teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'app-dashboard-admin', component: DashboardAdminComponent },
  { path: 'app-student-info/:_id', component: StudentInfoComponent },
  { path: 'app-edit-info-student/:_id', component: EditInfoStudentComponent },
  { path: 'app-teacher-info/:_id', component: TeacherInfoComponent },
  { path: 'EditInfoTeacherComponent/:_id', component: EditInfoTeacherComponent },
  { path: 'app-course-info/:_id', component: CourseInfoComponent },
  { path: 'app-edit-info-course/:_id', component: EditInfoCourseComponent },
  { path: 'app-parent-info/:_id', component: ParentInfoComponent },
  { path: 'app-mystudents/:_id', component: MystudentsComponent },
  { path: 'app-dashboard-student', component: DashboardStudentComponent },
  { path: 'app-dashboard-parent', component: DashboardParentComponent },
  { path: 'app-teachers', component: TeachersComponent },
  { path: 'app-all-courses', component: AllCoursesComponent },
  { path: 'app-newcarouseled', component: NewcarouseledComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
