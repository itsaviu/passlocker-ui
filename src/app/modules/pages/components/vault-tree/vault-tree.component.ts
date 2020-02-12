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
  public activeParentNode: VaultList;

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
      width: '450px',
      data: { title: "Create Vault" }
    })
  }

  hasChild = (_: number, node: VaultList) => !!node.subFolders && node.subFolders.length > 0;

  fetchVaultTree(initialCall = false) {
    this.managerService.fetchVaultTree().subscribe((resp: VaultList[]) => {
      this.dataSource.data = resp;
      if(resp.length > 0) {
        this.activeParentNode = resp[0];
        this.activeNode = resp[0];
      }
      if(this.activeParentNode) {
        this.managerService.updateVaultContainer(this.activeNode);
        this.managerService.updateVaultFolderSection(this.activeNode.id);
      }
      console.log(resp);
    }, (error) => {
      this.snackerWorker.openSnackBar('Something went wrong', 'X')
    });    
  }

  selectNode(node) {
    if(node && this.activeParentNode && this.activeParentNode.id != node.id) {
      this.activeParentNode = node;
      this.managerService.updateVaultContainer(node);
      this.managerService.updateVaultFolderSection(node.id);
    }
  }

  isSelected(id) {
    if(this.activeParentNode && this.activeParentNode.id === id) 
      return 'background-highlight';
    return '';
  }

  changeParentNode() {
    if(!this.activeNode)
      this.activeParentNode = null;
  }

  findNode(node: VaultList, nodeList: VaultList[]) {
    if(this.activeParentNode && this.activeParentNode.id === node.id) 
      return true;

    nodeList.forEach((n => {
      if( n.vaultList.length > 0) {
          this.findNode(node, n.subFolders);
      }
    }));

  }

}
