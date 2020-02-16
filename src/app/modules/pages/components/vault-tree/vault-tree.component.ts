import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VaultList, ManagerService, Vault } from 'src/app/service/manager.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource, MatDialog } from '@angular/material';
import { SnackerWorker, STATUS } from 'src/app/shared/helper/snacker-worker';
import { CreateVaultComponent } from '../create-vault/create-vault.component';
import { VaultTreeWorker } from '../../worker/vault-tree-worker';

@Component({
  selector: 'app-vault-tree',
  templateUrl: './vault-tree.component.html',
  styleUrls: ['./vault-tree.component.scss']
})
export class VaultTreeComponent implements OnInit {
  
  public activeNode: VaultList;

  public treeNode: VaultList[];

  treeControl = new NestedTreeControl<VaultList>(node => node.subFolders);
  dataSource = new MatTreeNestedDataSource<VaultList>();

  constructor(private managerService: ManagerService, private vaultTreeWorker: VaultTreeWorker, private snackerWorker: SnackerWorker, public dialog: MatDialog) {
    this.fetchVaultTree(null);    
    this.managerService.checkIfVaultTreeUpdate().subscribe((resp) => {
      this.fetchVaultTree(resp);
    })

    this.vaultTreeWorker.isTreeStructUpdateNeeded().subscribe((resp) => {
      this.pushVaultTree(resp, true);
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

  fetchVaultTree(toBeActiveNodeId) {
    this.managerService.fetchVaultTree().subscribe((resp: VaultList[]) => {
      this.dataSource.data = resp;
      if(resp.length > 0 && !toBeActiveNodeId) {
        this.activeNode = resp[0];
      } else if(resp.length > 0) {
        this.pushVaultTree(toBeActiveNodeId.id, toBeActiveNodeId.new);
      }
      if(this.activeNode) {
        this.managerService.updateVaultFolderSection(this.activeNode.id);
      }
    }, (error) => {
      this.snackerWorker.openSnackBar('Something went wrong', 'X', STATUS.FAIL)
    });    
  }

  selectNode(node) {
    if(node && this.activeNode && this.activeNode.id != node.id) {
      this.activeNode = node;
      this.managerService.updateVaultFolderSection(node.id);
    }
  }

  pushVaultTree(id, selectNode: boolean = true) {
    this.treeNode = [];
    let resultNode: VaultList = this.getNodeToPush(id, this.dataSource.data, selectNode);
    if(resultNode) {
      this.treeControl.dataNodes
      this.treeNode.reverse().forEach(node => 
        this.treeControl.expand(node)
      );
    }
  }

  getNodeToPush(id, nodeList: VaultList[], selectedNode: boolean) {  
    for(let i = 0; i < nodeList.length ; i++) {
      let resultNode: VaultList = this.findNode(id, nodeList[i]);
      if(resultNode) {
        this.treeNode.push(nodeList[i]);
        this.activeNode = selectedNode ? resultNode : nodeList[i];
        return nodeList[i];
      }
    }
    return null;
  }

  findNode(id, node: VaultList) {
    if(node.id === id) {
      return node;
    }
    
    for(let i = 0; i < node.subFolders.length ; i++) {

      let resultNode: VaultList = this.findNode(id, node.subFolders[i]);
      if(resultNode) {
        this.treeNode.push(node.subFolders[i]);
        return resultNode;
      }
    }

    return null;
  }

}
