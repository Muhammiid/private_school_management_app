import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignupFormComponent implements OnInit {
  signupForm!: FormGroup;
  imagePreview: any;
  cvPreview: any;
  path: string = this.router.url;
  btnsignup: string = '';
  msg:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private sanitizer: DomSanitizer // Add this line
  ) {}

  ngOnInit() {
    if (this.path === '/app-signup-admin') {
      this.btnsignup = 'Admin';
    } else if (this.path === '/app-signup-teacher') {
      this.btnsignup = 'Teacher';
    } else if (this.path === '/app-signup-student') {
      this.btnsignup = 'Student';
    } else {
      this.btnsignup = 'Parent';
    }

    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      phoneNumber: ['', Validators.required],
      childPhoneNumber:
        this.path === '/app-signup-parent' ? ['', Validators.required] : [''],
      data: [''], // Initialize img control,
      cv: [''], // Initialize img control,
      role: [''],
      speciality: [''],
      statut: [''],
    });
   
  }
  signup() {
    console.log('here', this.signupForm.value);

    if (this.path == '/app-signup-admin') {
      this.signupForm.value.role = 'admin';
    } else if (this.path == '/app-signup-teacher') {
      this.signupForm.value.role = 'teacher';
      this.signupForm.value.statut = 'NotOK';

    } else if (this.path == '/app-signup-student') {
      this.signupForm.value.role = 'student';

    } else {
      this.signupForm.value.role = 'parent';
    }
    this.userService
      .signup(
        this.signupForm.value,
       
        this.signupForm.value.data
      )
      .subscribe((result) => {
        console.log('here result', result.msg);
        this.msg=result.msg
      });
  }
  onCvSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.signupForm.patchValue({ cv: file });

      this.signupForm.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        // Use DomSanitizer to sanitize the URL
        this.cvPreview = this.sanitizer.bypassSecurityTrustResourceUrl(
          reader.result as string
        );
        console.log(this.cvPreview);
      };
      reader.readAsDataURL(file);
    }
  }

  onImageSelected(event: Event) {
    // const file = (event.target as HTMLInputElement).files[0];
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      this.signupForm.patchValue({ data: file });
      this.signupForm.updateValueAndValidity();
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
