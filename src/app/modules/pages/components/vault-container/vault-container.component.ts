import { Component, OnInit } from '@angular/core';
import { ManagerService, VaultList } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';
import { MatDialog } from '@angular/material';
import { CreateVaultComponent } from '../create-vault/create-vault.component';
import { CreatePasswordComponent } from '../create-password/create-password.component';
import { PwdDialogData } from 'src/app/models/pwd-dialog-data';

@Component({
  selector: 'app-vault-container',
  templateUrl: './vault-container.component.html',
  styleUrls: ['./vault-container.component.scss']
})
export class VaultContainerComponent implements OnInit {

  vaultList: VaultList;
  pwdDaialog: PwdDialogData;
  constructor(private dialog: MatDialog, private managerService: ManagerService) {
    this.managerService.checkIfVaultContainerUpdate().subscribe((resp: VaultList) => {
        this.vaultList = resp;
    });
  } 

  ngOnInit() {
  }

  createVault(folderId) {
    this.dialog.open(CreateVaultComponent, {
      width: '450px',
      data: { id: folderId, title: "Create Folder" }
    })
  }

  createPassword(folderId) {
    this.pwdDaialog = new PwdDialogData(null, "Add Password",folderId, '', '', '', '', '', false);
    this.dialog.open(CreatePasswordComponent, {
      width: '550px',
      data: this.pwdDaialog
    })
  }
}
