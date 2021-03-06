import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManagerService } from 'src/app/service/manager.service';
import { PwdDialogData } from 'src/app/models/pwd-dialog-data';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackerWorker, STATUS } from 'src/app/shared/helper/snacker-worker';


@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.scss']
})
export class CreatePasswordComponent implements OnInit {

  private pwdForm: FormGroup;
  loading: boolean = false;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreatePasswordComponent>, private managerService: ManagerService,
    @Inject(MAT_DIALOG_DATA) public data: PwdDialogData, private snackerWorker: SnackerWorker) { 
      dialogRef.disableClose = true;
    }

  ngOnInit() {
    this.pwdForm = this.fb.group({
      credentials: [this.data.credentials, [Validators.required]],
      folderId: this.data.folderId,
      login: [this.data.login, [Validators.required]],
      name: [this.data.name, [Validators.required]],
      notes: this.data.notes,
      url: this.data.url
    })
  }

  getNameError() {
    if(this.pwdForm.get('name').errors.required) {
      return "Name is required";
    }
    return "Something wrong";
  }

  getCredentialsError() {
    if(this.pwdForm.get('credentials').errors.required) { 
      return "Password is required";
    } else if(this.pwdForm.get('credentials').errors.minlength) {
      return "Password must be alteast 8 characters"
    }
  }

  getLoginError() {
    if(this.pwdForm.get('login').errors.required) {
      return "Login is required";
    }
    return "Something wrong";
  }

  closeDialog() {
    this.dialogRef.close();
  }

  submit() {  
    this.managerService.storePassword(this.pwdForm.value).subscribe((resp) => {
     this.managerService.updateVaultFolderSection(this.data.folderId);
     this.dialogRef.close();
    }, (error) => {
      this.snackerWorker.openSnackBar("Something went wrong !", "X", STATUS.FAIL);
    }) 
  }

  update() {
    if(this.data.id) 
    this.pwdForm.value['id'] = this.data.id;
    console.log(this.pwdForm.value);  

    this.managerService.updatePassword(this.pwdForm.value).subscribe((resp) => {
      this.managerService.updateVaultFolderSection(this.data.folderId);
      this.dialogRef.close();
     }, (error) => {
       this.snackerWorker.openSnackBar("Something went wrong !", "X", STATUS.FAIL);
     }) 
  }

}
