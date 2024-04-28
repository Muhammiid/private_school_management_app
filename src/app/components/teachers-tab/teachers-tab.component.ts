import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-teachers-tab',
  templateUrl: './teachers-tab.component.html',
  styleUrls: ['./teachers-tab.component.css']
})
export class TeachersTabComponent implements OnInit {
teachers:any;

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((result) => {
      console.log('here result', result.users);
      if (result.users) {
        const tab = result.users;
        this.teachers = result.users.filter((elt: { role: any }) => elt.role === 'teacher');
        console.log('here result teachers', this.teachers);
      }
    });
  }
  goToTeacherInfo(_id:any){
    this.router.navigate([`app-teacher-info/${_id}`]);
  }
  goToEditTeacher(_id:any){
    this.router.navigate([`EditInfoTeacherComponent/${_id}`]);
  }
  deleteUser(_id:any){
    this.userService.deleteUserByID(_id).subscribe((data)=>{
        console.log('here data',data.isDeleted)
        if(data.isDeleted){
          this.userService.getAllUsers().subscribe(
            (res)=>{
              this.teachers=res.users.filter((elt: { role: any }) => elt.role === 'teacher'); 
            }
          )
        }
    })
  }
}
