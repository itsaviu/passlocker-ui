import { Component, OnInit } from '@angular/core';
import { ManagerService, VaultList } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';

@Component({
  selector: 'app-vault-container',
  templateUrl: './vault-container.component.html',
  styleUrls: ['./vault-container.component.scss']
})
export class VaultContainerComponent implements OnInit {

  vaultList: VaultList;

  constructor(private managerService: ManagerService, private snackerWorker: SnackerWorker) {
    this.managerService.checkIfVaultContainerUpdate().subscribe((resp) => {
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
}
