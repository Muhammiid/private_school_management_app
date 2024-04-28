import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
notesURL: string = 'http://localhost:3000/notes';

  constructor(private httpClient: HttpClient) { }
  addNote(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.notesURL, obj);
  }
  getNoteByStudentId(studentId: string) {
    return this.httpClient.get<{ note:number,msg:string,err:string }>(`http://localhost:3000/notes/${studentId}`);
  }
getcoursesbystudentId(studentId: string) {
  return this.httpClient.get<{ courses:any,msg:string }>(`http://localhost:3000/notes/studentcourses/${studentId}`);
}
getcoursesbyPhoneNumber(childPhoneNumber: number) {
  return this.httpClient.get<{ courses:any}>(`http://localhost:3000/notes/studentcoursesbyphone/${childPhoneNumber}`);
}

}
