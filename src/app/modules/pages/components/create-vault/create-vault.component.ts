import { Component, OnInit, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManagerService } from 'src/app/service/manager.service';


export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-create-vault',
  templateUrl: './create-vault.component.html',
  styleUrls: ['./create-vault.component.scss']
})
export class CreateVaultComponent implements OnInit {

  loading = false;
  name: string = "";
  hideError = true;

  constructor(private dialogRef: MatDialogRef<CreateVaultComponent>, private managerService: ManagerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createVault() {
 
    if(!this.name || this.name.trim() === "") {
      this.hideError = false;
      return;
    } 

    let payload = {
      name: this.name
    };

    if(this.data) 
      payload["parentId"] = this.data.id;

    this.loading = true;
    this.managerService.createFolder(payload).subscribe((resp) => {
        this.loading = false;
        this.managerService.updateVaultTree(1);
        this.closeDialog();
    });
  }

  clear() { 
    this.hideError = true;
  }
}
