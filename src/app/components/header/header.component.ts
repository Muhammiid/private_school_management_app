import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  decodedToken: any;
  constructor(private router: Router) {}

  ngOnInit(): void {}

 
  
  isloggedIn(): boolean {
    let token: any = sessionStorage.getItem('token');
    if (token) {
      this.decodedToken = jwtDecode(token);
    }
    return !!token; // Returns true if token exists, false otherwise
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['app-home']);
  }
}
