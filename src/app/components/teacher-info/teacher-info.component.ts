import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teacher-info',
  templateUrl: './teacher-info.component.html',
  styleUrls: ['./teacher-info.component.css'],
})
export class TeacherInfoComponent implements OnInit {
  teacher: any;
  msg:any;
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit(): void {
    let _id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.userService.getUserByID(_id).subscribe({
      next: (response) => {
        this.teacher = response.obj;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      },
    });
  }

  updateTeacherStatus(event: any) {
    console.log(event.target.value);
    this.teacher.statut = event.target.value;
    this.userService.editUser(this.teacher).subscribe((response) => {
      console.log(response.msg);
      if(response.msg){
        this.msg=='affected '

      }
      this.msg==response.msg
      this.router.navigate(['app-dashboard-admin']);

    });
  }
}
