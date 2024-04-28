import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-info-teacher',
  templateUrl: './edit-info-teacher.component.html',
  styleUrls: ['./edit-info-teacher.component.css']
})
export class EditInfoTeacherComponent implements OnInit {
  editTeacherForm!: FormGroup;
  teacher: any={};
  _id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._id = this.activatedRoute.snapshot.paramMap.get('_id');
    if (this._id) {
      console.log( this._id)
      this.userService.getUserByID(this._id).subscribe((data) => {
        console.log(data.obj)
        this.teacher=data.obj
      });
    }
  }
  validate() {
    console.log(this.teacher);

    this.userService.editUser(this.teacher).subscribe({
      next:(response: any) => {
        console.log(response.msg);
        this.router.navigate(['app-dashboard-admin']);
      }
    });
  }

}
