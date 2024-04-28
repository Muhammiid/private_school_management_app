import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-student-tab',
  templateUrl: './student-tab.component.html',
  styleUrls: ['./student-tab.component.css']
})
export class StudentTabComponent implements OnInit {

students:any;

  constructor(private userService:UserService,private router: Router) { }
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((result:any)=>{
      console.log('here result',result.users)

      this.students = result.users.filter((elt: { role: any }) => elt.role === 'student');  })
  }
  goToStudentInfo(_id:any){
    this.router.navigate([`app-student-info/${_id}`]);
  }
  goToEditStudent(_id:any) {
    this.router.navigate([`app-edit-info-student/${_id}`]);
  }
  deleteUser(_id:any){
    this.userService.deleteUserByID(_id).subscribe((data)=>{
        console.log('here data',data.isDeleted)
        if(data.isDeleted){
          this.userService.getAllUsers().subscribe(
            (res)=>{
              this.students=res.users.filter((elt: { role: any }) => elt.role === 'student'); 
            }
          )
        }
    })
  }
}
