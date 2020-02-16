import { Component, Output, EventEmitter, Input } from '@angular/core';
import { ManagerService, VaultList, Vault, VaultDetailResp } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';
import { MatDialog } from '@angular/material';
import { CreateVaultComponent } from '../create-vault/create-vault.component';
import { PwdDialogData } from 'src/app/models/pwd-dialog-data';
import { CreatePasswordComponent } from '../create-password/create-password.component';
import { VaultTreeWorker } from '../../worker/vault-tree-worker';
import { VaultContainerWorker } from '../../worker/vault-container-worker';

@Component({
  selector: 'app-vault-folder-section',
  templateUrl: './vault-folder-section.component.html',
  styleUrls: ['./vault-folder-section.component.scss']
})
export class VaultFolderSectionComponent {
  hide: boolean = true;

  pwdDaialog: PwdDialogData;

  @Output("invokeCreatePwd") invokeCreatePwd = new EventEmitter();

  @Input("vaultData") vaultData: VaultList;

  @Input("selectedVault") selectedVault: Vault;
 

  constructor(private managerService: ManagerService, private vaultTreeWroker: VaultTreeWorker, private vaultContainerWorker: VaultContainerWorker, private snackerWorker: SnackerWorker, private dialog: MatDialog) {
   }

  createPassword() {
    this.invokeCreatePwd.emit();
  }


  loadData(item) {
    this.managerService.updateVaultFolderSection(item.id);
    this.vaultTreeWroker.updateTreeStruct(item.id);
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

  updateSelectedVault(vault: Vault) {
    this.vaultContainerWorker.updateSelectedVault(vault);
  }

  clearSelectedVault() {
    this.vaultContainerWorker.updateSelectedVault(null);
  }

  toogleHide() {
    this.hide = !this.hide;
  }

  copy(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
    this.snackerWorker.openAlert("Copied to clipboard", "X");
  }

  editSection() {
    this.pwdDaialog = new PwdDialogData(this.selectedVault.id, "Edit Password", this.vaultData.id, this.selectedVault.name, this.selectedVault.credentials, this.selectedVault.login, this.selectedVault.notes, this.selectedVault.url, true);
    this.dialog.open(CreatePasswordComponent, {
      width: '550px',
      data: this.pwdDaialog
    });
  }
}