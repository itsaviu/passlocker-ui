import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

export interface VaultList {
  id: number,
  name: string,
  createdAt: string,
  subFolders?: VaultList[],
  vaultList?: Vault[]
}

export interface Vault {
  id: number,
  name: string,
  login: string,
  url: string
}

@Injectable()
export class ManagerService {

  constructor(private httpService: HttpClient) { }

  private vaultTree = new Subject<any>();

  private vaultContainer = new Subject<any>();

  private vaultFolderSection = new Subject<any>();

  updateVaultTree(value) {
    this.vaultTree.next(value);
  }

  updateVaultContainer(value) {
    this.vaultContainer.next(value);
  }

  updateVaultFolderSection(value) {
    this.vaultFolderSection.next(value);
  }

  checkIfVaultTreeUpdate(): Observable<object> {
    return this.vaultTree.asObservable();
  }

  checkIfVaultContainerUpdate(): Observable<object> {
    return this.vaultContainer.asObservable();
  }

  checkIfVaultFolderSectionUpdate(): Observable<object> {
    return this.vaultFolderSection.asObservable();
  }

  fetchVaultTree(): Observable<VaultList[]> {
      return <Observable <VaultList[]>> this.httpService.get(environment.MANAGER_URL + '/folders/lists');
  }

  createFolder(payload) {
    return this.httpService.post(environment.MANAGER_URL + '/folders/create', payload);
  }

  fetchVaultDetails(id): Observable<VaultList> {
    return <Observable<VaultList>> this.httpService.get(environment.MANAGER_URL + '/folders/' + id)
  }

  storePassword(payload) {
    return this.httpService.post(environment.MANAGER_URL + '/vault/store', payload);
  }

}
