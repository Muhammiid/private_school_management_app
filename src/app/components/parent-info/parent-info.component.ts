import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parent-info',
  templateUrl: './parent-info.component.html',
  styleUrls: ['./parent-info.component.css']
})
export class ParentInfoComponent implements OnInit {
  parent:any;
  constructor(private activatedRoute: ActivatedRoute,
  
    private userService: UserService) { }

  ngOnInit(): void {
    let _id = this.activatedRoute.snapshot.paramMap.get('_id');
    this.userService.getUserByID(_id).subscribe({
      next: (response) => {
        this.parent = response.obj;
      },
      error: (error) => {
        console.error('Error fetching user:', error);
      }
    });
  }

}
