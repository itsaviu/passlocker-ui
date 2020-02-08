import { Component, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ManagerService } from 'src/app/service/manager.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-create-vault',
  templateUrl: './create-vault.component.html',
  styleUrls: ['./create-vault.component.scss']
})
export class CreateVaultComponent implements OnInit {

  loading = false;
  name: string = "";

  constructor(private dialogRef: MatDialogRef<CreateVaultComponent>, private managerService: ManagerService) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createVault() {
    this.loading = true;
    const payload = {
      name: this.name
    };
    this.managerService.createFolder(payload).subscribe((resp) => {
        this.loading = false;
        this.managerService.updateVaultTree(1);
        this.closeDialog();
    });
  }
}
