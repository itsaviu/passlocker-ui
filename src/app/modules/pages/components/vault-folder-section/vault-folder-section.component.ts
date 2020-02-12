import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ManagerService, VaultList } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';
import { MatDialog } from '@angular/material';
import { CreateVaultComponent } from '../create-vault/create-vault.component';

@Component({
  selector: 'app-vault-folder-section',
  templateUrl: './vault-folder-section.component.html',
  styleUrls: ['./vault-folder-section.component.scss']
})
export class VaultFolderSectionComponent implements OnInit {

  vaultList: VaultList;

  @Output("invokeCreatePwd") invokeCreatePwd = new EventEmitter();


  constructor(private managerService: ManagerService, private snackerWorker: SnackerWorker, private dialog: MatDialog) {
    this.managerService.checkIfVaultFolderSectionUpdate().subscribe((resp) => {
      this.fetchVaultDetails(resp);
    });
   }

  ngOnInit() {
  }

  fetchVaultDetails(id) {
    this.managerService.fetchVaultDetails(id).subscribe((resp: VaultList) => {
        this.vaultList = resp;
    }, (error) => {
      this.snackerWorker.openSnackBar("Something went wrong !", "X");
    });
  }

  createPassword() {
    this.invokeCreatePwd.emit();
  }


  loadData(item) {
    this.managerService.updateVaultContainer(item);
    this.managerService.updateVaultFolderSection(item.id);
  }

  goToLink(url: string){
    window.open(url, "_blank");
  }

  getChipValue(name: string) {
    if(name && name.length > 0)
      return name.charAt(0).toUpperCase();
    return "";
  }

  openCreateVault() {
    this.dialog.open(CreateVaultComponent, {
      width: '450px',
      data: { title: "Create Vault" }
    });
  }
}
