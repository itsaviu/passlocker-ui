import { Component, OnInit } from '@angular/core';
import { ManagerService, VaultList } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';
import { MatDialog } from '@angular/material';
import { CreateVaultComponent } from '../create-vault/create-vault.component';

@Component({
  selector: 'app-vault-container',
  templateUrl: './vault-container.component.html',
  styleUrls: ['./vault-container.component.scss']
})
export class VaultContainerComponent implements OnInit {

  vaultList: VaultList;

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
      data: { id: folderId }
    })
  }
}
