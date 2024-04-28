import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  msg:any;
  constructor(private formBuilder: FormBuilder,private router: Router,private userService:UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      phoneNumber: ['', Validators.required],
    });
  }
  login(){
    this.userService.login(this.loginForm.value).subscribe((result)=>{
      console.log('here result',result.msg,result.token);
      result.msg
      if (result.token) {
        sessionStorage.setItem('token', result.token);
        let decodedToken: any = jwtDecode(result.token);
        console.log('this is decoded token', decodedToken);
        if (decodedToken.role === 'admin') {
          this.router.navigate(['app-dashboard-admin']); 
        } else {
          this.router.navigate(['app-home']);
        }
      } else {
        console.log('pleasd check your phone number');
        this.msg='pleasd check your number';
      }
  })
  }
}
