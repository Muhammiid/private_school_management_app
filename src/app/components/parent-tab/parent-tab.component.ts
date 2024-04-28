import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parent-tab',
  templateUrl: './parent-tab.component.html',
  styleUrls: ['./parent-tab.component.css']
})
export class ParentTabComponent implements OnInit {
parents:any;
  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((result:any)=>{
      console.log('here result',result.users)
      this.parents = result.users.filter((elt: { role: any }) => elt.role === 'parent');  })
  }
  goToParentInfo(_id:any){
    this.router.navigate([`app-parent-info/${_id}`]);
  }
  

}
