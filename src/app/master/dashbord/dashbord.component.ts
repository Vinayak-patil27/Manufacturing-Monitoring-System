import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {
  activeList: any[] = [];
  summary = { customers: 0, machines: 0, components: 0 };
  activeColumns: string [] = [];
  currentTitle: string = 'Select a category to view details';
  selectedItem: any = null;

  // Master Data (to be filled by API)
  allMachines: any[] = [];
  allCustomers: any[] = [];
  allComponents: any[] = [];
  constructor() { }

  ngOnInit(): void {
    this.allMachines = ['Name', 'Serial_No' ,'Model'];
  }
  loadAllData() {
    // In a real app, use forkJoin to get all at once. For now:
    // this.http.get<any[]>('api/Machine').subscribe(res => {
    //   this.allMachines = res;
    //   this.summary.machines = res.length;
    // });
    // this.http.get<any[]>('api/Customer').subscribe(res => {
    //   this.allCustomers = res;
    //   this.summary.customers = res.length;
    // });
    // this.http.get<any[]>('api/Component').subscribe(res => {
    //   this.allComponents = res;
    //   this.summary.components = res.length;
    // });
  }

  // Common method to switch table view
  loadList(type: string) {
    this.selectedItem = null; // Reset details view

    switch (type) {
      case 'customers':
        this.currentTitle = 'Customer Master List';
        this.activeColumns = ['ID', 'Customer Name'];
        this.activeList = this.allCustomers;
        break;
      case 'machines':
        this.currentTitle = 'Machine Master List';
        this.activeColumns = ['Name', 'Serial_No' ,'Model'];
        this.activeList = this.allMachines;
        break;
      case 'components':
        this.currentTitle = 'Component Master List';
        this.activeColumns = [ 'Part No', 'Part Name', 'ECN'];
        this.activeList = this.allComponents;
        break;
    }
  }

  onRowClick(item: any) {
    this.selectedItem = item;
    // Logic to load related operations if it's a machine
    if (item.machineName) {
      //  this.http.get<any[]>(`api/ComponentOperation/ByMachine/${item.id}`)
      //      .subscribe(ops => this.selectedItem.operations = ops);
    }
  }
}
