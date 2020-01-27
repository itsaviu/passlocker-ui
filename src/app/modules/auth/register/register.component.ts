import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataFeeder } from 'src/app/constants/AuthInheritableData';
import { AuthAppholder } from 'src/app/models/authappholder';
import { from } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private authInheritableData: AuthAppholder = dataFeeder('REGISTER');
  private registerationForm: FormGroup;
  
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.registerationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  getEmailValidationMsg() {
    if(this.registerationForm.get('emailId').errors.required) {
      return "Email id is required";
    } else if(this.registerationForm.get('emailId').errors.email) {
      return "Enter valid email id";
    }
  }

  getPwdValidationMsg() {
    if(this.registerationForm.get('password').errors.required) {
      return "Password id is required";
    } else if(this.registerationForm.get('password').errors.minlength) {
      return "Password must be alteast 8 characters";
    }
  }

  getUserNameValidationMsg() {
    if(this.registerationForm.get('username').errors.required) {
      return "Username id is required";
    } else if(this.registerationForm.get('username').errors.minlength) {
      return "Username must be alteast 3 characters";
    }
  }

  onSubmit(e) {
    console.log(e);
  }

  redirectToLogin() {
      this.router.navigateByUrl('/auth/login');
  }
}
