import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userURL: string = 'http://localhost:3000/users';

  constructor(private httpClient: HttpClient) {}

  
  getAllUsers() {
    return this.httpClient.get<{ users: any }>(this.userURL);
  }

  getUserByID(_id: any) {
    return this.httpClient.get<{ obj: any; msg: any }>(
      `${this.userURL}/${_id}`
    );
  }

  affecteUser(studentId:any,courseId:any) { 
    return this.httpClient.get<{ msg: string }>(
      `http://localhost:3000/users/affecte/${studentId}/${courseId}`
      
    );
  }
  editUser(obj: any) {
    return this.httpClient.put<{ msg: string }>(
      'http://localhost:3000/users/edit',
      obj
    );
  }
  deleteUserByID(_id: number) {
    return this.httpClient.delete<{ isDeleted: boolean }>(
      `${this.userURL}/${_id}`
    );
  }

  signup(user: any, data: File) {
    let fData = new FormData();
    if (user.role == 'admin') {
      fData.append('firstName', user.firstName);
      fData.append('lastName', user.lastName);
      fData.append('email', user.email);
      fData.append('password', user.password);
      fData.append('phoneNumber', user.phoneNumber);
      fData.append('role', user.role);
    } else if (user.role == 'teacher') {
      fData.append('firstName', user.firstName);
      fData.append('lastName', user.lastName);
      fData.append('email', user.email);
      fData.append('password', user.password);
      fData.append('phoneNumber', user.phoneNumber);
      fData.append('speciality', user.speciality);
      fData.append('statut', user.statut);
      fData.append('data', data);
      fData.append('cv',user.cv);
      fData.append('role', user.role);
    } else if (user.role == 'student') {
      fData.append('data', data);
      fData.append('firstName', user.firstName);
      fData.append('lastName', user.lastName);
      fData.append('email', user.email);
      fData.append('password', user.password);
      fData.append('role', user.role);
      fData.append('phoneNumber', user.phoneNumber);
    } else {
      fData.append('firstName', user.firstName);
      fData.append('lastName', user.lastName);
      fData.append('email', user.email);
      fData.append('password', user.password);
      fData.append('role', user.role);
      fData.append('phoneNumber', user.phoneNumber);
      fData.append('childPhoneNumber', user.childPhoneNumber);
    }
    return this.httpClient.post<{ msg: string }>(
      'http://localhost:3000/users/signup',
      fData
    );
  }
  login(userObg: any) {
    return this.httpClient.post<{ msg: String; token: string }>(
      'http://localhost:3000/users/login',
      userObg
    );
  }
}
