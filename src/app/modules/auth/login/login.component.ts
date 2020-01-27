import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataFeeder } from 'src/app/constants/AuthInheritableData';
import { AuthAppholder } from 'src/app/models/authappholder';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authInheritableData: AuthAppholder = dataFeeder("LOGIN");
  private loginForm: FormGroup;

  user = {
    emailIds: '',
    password: ''
  };



  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  redirectToRegister() {
    this.router.navigateByUrl('/auth/register');
  }

  getEmailValidationMsg() {
    if(this.loginForm.get('emailId').errors.required) {
      return "Email id is required";
    } else if(this.loginForm.get('emailId').errors.email) {
      return "Enter valid email id";
    }
  }

  getPwdValidationMsg() {
    if(this.loginForm.get('password').errors.required) {
      return "Password id is required";
    } else if(this.loginForm.get('password').errors.minlength) {
      return "Password must be alteast 8 characters";
    }
  }

  onSubmit(e) {
    console.log(this.loginForm);
  }

}
