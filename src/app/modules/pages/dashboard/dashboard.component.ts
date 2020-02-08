import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ManagerService, VaultList } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';
import { MatDialog } from '@angular/material';
import { CreateVaultComponent } from '../components/create-vault/create-vault.component';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface TreeNode {
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple'},
      {name: 'Banana'},
      {name: 'Fruit loops'},
    ]
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli'},
          {name: 'Brussels sprouts'},
        ]
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins'},
          {name: 'Carrots'},
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  treeControl = new NestedTreeControl<VaultList>(node => node.subFolders);
  dataSource = new MatTreeNestedDataSource<VaultList>();

  constructor(private managerService: ManagerService, private snackerWorker: SnackerWorker, public dialog: MatDialog) {
    this.fetchVaultTree();    
    this.managerService.checkIfVaultTreeUpdate().subscribe((resp) => {
      console.log('vault Updated');
      this.fetchVaultTree();
    })
  }

  insertIntoNode() {

  }

  hasChild = (_: number, node: VaultList) => !!node.subFolders && node.subFolders.length > 0;

  ngOnInit() {
  }

  openDialog() {
    this.dialog.open(CreateVaultComponent, {
      width: '450px'
    })
  }

  fetchVaultTree() {
    this.managerService.fetchVault().subscribe((resp: VaultList[]) => {
      this.dataSource.data = resp;
      console.log(resp);
    }, (error) => {
      this.snackerWorker.openSnackBar('Something went wrong', 'X')
    });    
  }

} 
