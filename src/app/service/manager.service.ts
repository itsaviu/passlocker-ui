import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';

export interface VaultDetailResp {
  breadCrumbs: VaultBreadCrumbs[];
  folders: VaultList;
}

export interface VaultBreadCrumbs {
  id: number;
  name: string;
}

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
  url: string,
  credentials?: string,
  notes?: string,
  createdAt?: string
}

@Injectable()
export class ManagerService {

  constructor(private httpService: HttpClient) { }

  private vaultTree = new Subject<any>();

  private vaultFolderSection = new Subject<any>();

  updateVaultTree(value) {
    this.vaultTree.next(value);
  }

  updateVaultFolderSection(value) {
    this.vaultFolderSection.next(value);
  }

  checkIfVaultTreeUpdate(): Observable<object> {
    return this.vaultTree.asObservable();
  }

  checkIfVaultFolderSectionUpdate(): Observable<object> {
    return this.vaultFolderSection.asObservable();
  }

  fetchVaultTree(): Observable<VaultList[]> {
      return <Observable <VaultList[]>> this.httpService.get(environment.MANAGER_URL + '/folders/lists');
  }

  createFolder(payload): Observable<Object> {
    return this.httpService.post(environment.MANAGER_URL + '/folders/create', payload);
  }

  fetchVaultDetails(id): Observable<VaultDetailResp> {
    return <Observable<VaultDetailResp>> this.httpService.get(environment.MANAGER_URL + '/folders/' + id)
  }

  storePassword(payload) {
    return this.httpService.post(environment.MANAGER_URL + '/vault/store', payload);
  }

  updatePassword(payload) {
    return this.httpService.put(environment.MANAGER_URL + '/vault/update', payload);
  }
}
