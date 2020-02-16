import { Component, OnInit } from '@angular/core';
import { ManagerService, VaultList, VaultDetailResp, Vault, VaultBreadCrumbs } from 'src/app/service/manager.service';
import { SnackerWorker, STATUS } from 'src/app/shared/helper/snacker-worker';
import { MatDialog } from '@angular/material';
import { CreateVaultComponent } from '../create-vault/create-vault.component';
import { CreatePasswordComponent } from '../create-password/create-password.component';
import { PwdDialogData } from 'src/app/models/pwd-dialog-data';
import { VaultContainerWorker } from '../../worker/vault-container-worker';
import { VaultTreeWorker } from '../../worker/vault-tree-worker';

@Component({
  selector: 'app-vault-container',
  templateUrl: './vault-container.component.html',
  styleUrls: ['./vault-container.component.scss']
})
export class VaultContainerComponent implements OnInit {

  vaultList: VaultList;
  pwdDaialog: PwdDialogData;
  selectedVault: Vault;
  breadCrumbs: VaultBreadCrumbs[];
  
  constructor(private dialog: MatDialog, private managerService: ManagerService, private vaultTreeWroker: VaultTreeWorker, private vaultContaineWorker: VaultContainerWorker, private snackerWorker: SnackerWorker) {

    this.managerService.checkIfVaultFolderSectionUpdate().subscribe((resp) => {
      this.fetchVaultDetails(resp);
      this.selectedVault = null;
    });

    this.vaultContaineWorker.updatedSelectedVaultReq().subscribe((resp: Vault) => {
      this.selectedVault = resp;
    })
  } 

  ngOnInit() {
  }

  fetchVaultDetails(id) {
    this.managerService.fetchVaultDetails(id).subscribe((resp: VaultDetailResp) => {
      this.breadCrumbs = resp.breadCrumbs;
      this.vaultList = resp.folders;
    }, (error) => {
      this.snackerWorker.openSnackBar("Something went wrong !", "X", STATUS.FAIL);
    });
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

  selectedFolder(breadCrumb) {
    if ( this.breadCrumbs[this.breadCrumbs.length - 1].id != breadCrumb.id) {
      console.log('selected id' + breadCrumb);
      this.fetchVaultDetails(breadCrumb.id);
      this.vaultTreeWroker.updateTreeStruct(breadCrumb.id);
    }
  }
}
