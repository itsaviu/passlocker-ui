import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

export interface VaultList {
  id: number,
  name: string,
  createdAt: string,
  subFolders?: VaultList[]
}

@Injectable()
export class ManagerService {

  constructor(private httpService: HttpClient) { }

  private vaultTree = new Subject<any>();

  updateVaultTree(value) {
    this.vaultTree.next(value);
  }

  checkIfVaultTreeUpdate(): Observable<object> {
    return this.vaultTree.asObservable();
  }

  fetchVault(): Observable<VaultList[]> {
      return <Observable <VaultList[]>> this.httpService.get(environment.MANAGER_URL + '/folders/lists');
  }

  createFolder(payload) {
    return this.httpService.post(environment.MANAGER_URL + '/folders/create', payload);
  }

}
