import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { jwtDecode } from 'jwt-decode';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-parent',
  templateUrl: './dashboard-parent.component.html',
  styleUrls: ['./dashboard-parent.component.css'],
})
export class DashboardParentComponent implements OnInit {
  decodedToken: any;
  courses: any = [];
  constructor(
    private noteService: NoteService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token: string | null = sessionStorage.getItem('token'); // Ensure token is of type string
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
    this.userService.getUserByID(this.decodedToken._id).subscribe((data) => {
      if (data.obj) {
        console.log(data.obj);
        this.noteService
          .getcoursesbyPhoneNumber(data.obj.childPhoneNumber)
          .subscribe((result) => {
            console.log(result.courses);
            this.courses = result.courses;
          });
      }
    });
  }
  evaluation(note: number) {
    if (note < 10) {
      return ("red")

    } else  {
      return ("green")
    }
  }

}
