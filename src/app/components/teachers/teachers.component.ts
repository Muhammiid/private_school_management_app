import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
teachers:any=[];
  constructor(private userService:UserService) { }

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

}
