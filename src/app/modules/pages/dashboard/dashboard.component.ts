import { Component, OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ManagerService, VaultList } from 'src/app/service/manager.service';
import { SnackerWorker } from 'src/app/shared/helper/snacker-worker';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  treeControl = new NestedTreeControl<VaultList>(node => node.subFolders);
  dataSource = new MatTreeNestedDataSource<VaultList>();

  constructor(private managerService: ManagerService, private snackerWorker: SnackerWorker) {
  }

  ngOnInit() {
  }
} 
