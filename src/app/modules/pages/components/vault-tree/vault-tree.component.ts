import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VaultList, ManagerService } from 'src/app/service/manager.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog } from '@angular/material';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';
import { CreateVaultComponent } from '../create-vault/create-vault.component';

@Component({
  selector: 'app-vault-tree',
  templateUrl: './vault-tree.component.html',
  styleUrls: ['./vault-tree.component.scss']
})
export class VaultTreeComponent implements OnInit {
  
  public activeNode;
  public activeParentNode;

  treeControl = new NestedTreeControl<VaultList>(node => node.subFolders);
  dataSource = new MatTreeNestedDataSource<VaultList>();

  constructor(private managerService: ManagerService, private snackerWorker: SnackerWorker, public dialog: MatDialog) {
    this.fetchVaultTree(true);    
    this.managerService.checkIfVaultTreeUpdate().subscribe((resp) => {
      this.fetchVaultTree();
    })
  }

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(CreateVaultComponent, {
      width: '450px'
    })
  }

  hasChild = (_: number, node: VaultList) => !!node.subFolders && node.subFolders.length > 0;

  fetchVaultTree(initialCall = false) {
    this.managerService.fetchVaultTree().subscribe((resp: VaultList[]) => {
      this.dataSource.data = resp;
      if(initialCall && resp.length > 0) {
        this.activeParentNode = resp[0].id;
        this.managerService.updateVaultContainer(this.activeParentNode);
      }
      console.log(resp);
    }, (error) => {
      this.snackerWorker.openSnackBar('Something went wrong', 'X')
    });    
  }

  selectNode(id) {
    if(this.activeParentNode != id) 
      this.managerService.updateVaultContainer(id);
    this.activeParentNode = id;
  }

  isSelected(id) {
    if(this.activeParentNode === id) 
      return 'background-highlight';
    return '';
  }

  changeParentNode() {
    if(!this.activeNode)
      this.activeParentNode = '';
  }

}
