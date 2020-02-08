import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataFeeder } from 'src/app/constants/AuthInheritableData';
import { AuthAppholder } from 'src/app/models/authappholder';
import { from } from 'rxjs';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private authInheritableData: AuthAppholder = dataFeeder('REGISTER');
  private registerationForm: FormGroup;
  private loading: boolean=false;
  
  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private snacker: SnackerWorker) { }

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
      return "Password is required";
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

    this.loading = true;
    this.authService.registerUser(e.value).subscribe((resp) => {
      this.snacker.openSnackBar("Sucessfully registered", 'X');
      this.router.navigateByUrl("/auth/login");
      this.loading = false;
      console.log(resp);
    }, (error) => {
      if(error.status === 400)
        this.snacker.openSnackBar(error.error.message, 'X');
      else 
        this.snacker.openSnackBar('Something went wrong !', 'X');
      this.loading = false;
      console.log(error);
    })
  }

  redirectToLogin() {
      this.router.navigateByUrl('/auth/login');
  }
}
