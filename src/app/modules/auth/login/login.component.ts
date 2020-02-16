import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { dataFeeder } from 'src/app/constants/AuthInheritableData';
import { AuthAppholder } from 'src/app/models/authappholder';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { SnackerWorker, STATUS } from 'src/app/shared/helper/snacker-worker';
import { SessionManagerService } from 'src/app/utils/session-manager.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authInheritableData: AuthAppholder = dataFeeder("LOGIN");
  private loginForm: FormGroup;
  private loading: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private snacker: SnackerWorker,
    private sessionManager: SessionManagerService) { }

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

  onSubmit() {
    this.loading = true;
    this.authService.loginUser(this.loginForm.value).subscribe((resp) => {
      this.snacker.openSnackBar("Login Sucessful !", "X", STATUS.SUCCES);
      console.log(resp);
      this.sessionManager.storeSession(resp);
      this.router.navigateByUrl('/pages');
      this.loading = false;
    }, (error) => {
      if(error.status === 400)  
        this.snacker.openSnackBar(error.error.message, "X", STATUS.FAIL);
      if(error.status === 401)  
        this.snacker.openSnackBar("User not found, please verify your credentials", "X", STATUS.FAIL);
      else 
        this.snacker.openSnackBar('Something went wrong !', "X", STATUS.FAIL);  
      this.loading = false;
    })
  }

}
