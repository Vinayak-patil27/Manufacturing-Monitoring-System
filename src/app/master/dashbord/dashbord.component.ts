import { Component, OnInit } from '@angular/core';
import { MasterService } from '../master.service';
import { forkJoin } from 'rxjs';
import { OperationType } from '../componentoperation/componentoperationmaster';
import { OperationDetailsViewModel } from './operation-details-view-model';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  activeList: any[] = [];
  customerscount: number = 0;
  machinescount: number = 0;
  componentscount: number = 0;
  operationscount: number = 0;
  activeColumns: string[] = [];
  currentTitle: string = 'Select a category to view details';
  selectedItem: any = null;

  // Master Data (to be filled by API)
  allMachines: any[] = [];
  allCustomers: any[] = [];
  allComponents: any[] = [];
  allOperations: any[] = [];
  searchText: string = '';
  allOperationDetails: OperationDetailsViewModel[] = [];

  constructor(private masterService: MasterService) { }

  ngOnInit(): void {
    this.loadAllData();
    this.loadList('customers');

  }

  loadAllData() {
    this.masterService.getAllCustomers().subscribe({
      next: (x) => { this.customerscount = x.length, this.allCustomers = x },
      error: (err) => {
        console.error('Error loading dashboard data', err);
      }
    });
    this.masterService.getAllMachines().subscribe({
      next: (x) => { this.machinescount = x.length, this.allMachines = x },
      error: (err) => {
        console.error('Error loading dashboard data', err);
      }
    });
    this.masterService.getAllComponents().subscribe({
      next: (x) => { this.componentscount = x.length, this.allComponents = x },
      error: (err) => {
        console.error('Error loading dashboard data', err);
      }
    });
    this.masterService.getAllComponentOperations().subscribe({
      next: (x) => { this.operationscount = x.length, this.allOperations = x },
      error: (err) => {
        console.error('Error loading dashboard data', err);
      }
    });
    this.masterService.getOperationDetails(this.searchText).subscribe({
      next: (x) => { this.allOperationDetails = x; },
      error: (err) => {
        console.error('Error loading dashboard data', err);
      }
    })
  }

  // Common method to switch table view
  loadList(type: string) {
    this.selectedItem = null; // Reset details view

    switch (type) {
      case 'customers':
        this.currentTitle = 'Customer Master List';
        this.activeColumns = ['ID', 'Customer Name'];
        this.loadAllData();
        this.activeList = this.allCustomers;
        break;
      case 'machines':
        this.currentTitle = 'Machine Master List';
        this.activeColumns = ['Name', 'Serial_No', 'Model'];
        this.loadAllData();
        this.activeList = this.allMachines;
        break;
      case 'components':
        this.currentTitle = 'Component Master List';
        this.activeColumns = ['Part No', 'Part Name', 'ECN'];
        this.loadAllData();
        this.activeList = this.allComponents;
        break;
      case 'operations':
        this.currentTitle = 'Component Operation List';
        this.activeColumns = ['Component', 'Machine', 'Code', 'Name', 'Type'];
        this.loadAllData();
        this.activeList = this.allOperations;
        break;
    }
  }

  getOperationTypeName(type: number): string {
    return OperationType[type] || 'Unknown';
  }

  onSearchChange() {
    if (this.searchText && this.searchText.length > 0) {
      this.masterService.getOperationDetails(this.searchText).subscribe({
        next: (res: OperationDetailsViewModel[]) => {
          this.allOperationDetails = res;
          this.currentTitle = 'Search Results';
          this.activeList = res;
        },
        error: (err: any) => {
          console.error('Error searching operation details', err);
          this.allOperationDetails = [];
        }
      });
    } else {
      this.loadList('customers'); // Fallback to customers if search is empty
    }
  }

  onRowClick(item: any) {
    this.selectedItem = item;
  }
}
