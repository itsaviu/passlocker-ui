import { Component, OnInit } from '@angular/core';
import { ManagerService, VaultList } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';

@Component({
  selector: 'app-vault-folder-section',
  templateUrl: './vault-folder-section.component.html',
  styleUrls: ['./vault-folder-section.component.scss']
})
export class VaultFolderSectionComponent implements OnInit {

  vaultList: VaultList;

  constructor(private managerService: ManagerService, private snackerWorker: SnackerWorker) {
    this.managerService.checkIfVaultContainerUpdate().subscribe((resp: VaultList) => {
      this.fetchVaultDetails(resp.id);
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

}
