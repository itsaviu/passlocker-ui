import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Vault } from 'src/app/service/manager.service';

@Injectable()
export class VaultContainerWorker {

  constructor() { }

  private selectedVault = new Subject<Vault>();

  public updateSelectedVault(vault: Vault) {
    this.selectedVault.next(vault);
  }

  public updatedSelectedVaultReq(): Observable<Vault> {
    return <Observable<Vault>> this.selectedVault.asObservable();
  }
}
