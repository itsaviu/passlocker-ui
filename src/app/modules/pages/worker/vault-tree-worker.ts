import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class VaultTreeWorker {

  constructor() { }

  private treeStruct = new Subject<any>();
  
  updateTreeStruct(value) {
    this.treeStruct.next(value);
  }

  isTreeStructUpdateNeeded(): Observable<object> {
    return this.treeStruct.asObservable();
  }

}
