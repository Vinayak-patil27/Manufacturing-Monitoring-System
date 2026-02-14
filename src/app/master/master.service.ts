import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Componentmaster } from './componentmaster/componentmaster';
import { Customermaster } from './customermaster/customermaster';
import { Machinemaster } from './machinemaster/machinemaster';
import { Machinemanufacturer } from './manufacturermaster/machinemanufacturer';
import { LocationMaster } from './loactionmaster/locationmaster';
import { Componentoperationmaster } from './componentoperation/componentoperationmaster';
import { OperationDetailsViewModel } from './dashbord/operation-details-view-model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  private apiurl: string;
  private token: string = "";
  constructor(private http: HttpClient) {
    this.apiurl = "https://localhost:7272/api/";
  }




  getAllComponents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiurl + "Component");
  }

  getComponentById(id: number): Observable<Componentmaster> {
    return this.http.get<Componentmaster>(this.apiurl + "Component/" + id);
  }
  saveComponent(Component: Componentmaster) {
    return this.http.post(this.apiurl + "Component", Component, { responseType: 'text' });
  }
  updateCompoent(Component: Componentmaster, id: number) {
    return this.http.put(this.apiurl + 'Component/' + id, Component, { responseType: 'text' });
  }
  deleteComponent(id: number) {
    return this.http.delete(this.apiurl + 'Component/' + id, { responseType: 'text' });
  }


  // ------------ Customer ------------
  getAllCustomers(): Observable<Customermaster[]> {
    return this.http.get<Customermaster[]>(this.apiurl + 'Customer');
  }
  getAllCustomersDetails(): Observable<Customermaster[]> {
    return this.http.get<Customermaster[]>(this.apiurl + 'Customer/customerdetails');
  }
  getCustomerById(id: number): Observable<Customermaster> {
    return this.http.get<Customermaster>(this.apiurl + 'Customer/' + id);
  }
  saveCustomer(item: Customermaster) {
    return this.http.post(this.apiurl + 'Customer', item, { responseType: 'text' });
  }
  updateCustomer(item: Customermaster, id: number) {
    return this.http.put(this.apiurl + 'Customer/' + id, item, { responseType: 'text' });
  }
  deleteCustomer(id: number) {
    return this.http.delete(this.apiurl + 'Customer/' + id, { responseType: 'text' });
  }

  // ------------ Machine ------------
  getAllMachines(): Observable<Machinemaster[]> {
    return this.http.get<Machinemaster[]>(this.apiurl + 'Machine');
  }
  getMachineById(id: number): Observable<Machinemaster> {
    return this.http.get<Machinemaster>(this.apiurl + 'Machine/' + id);
  }
  saveMachine(item: Machinemaster) {
    return this.http.post(this.apiurl + 'Machine', item, { responseType: 'text' });
  }
  updateMachine(item: Machinemaster, id: number) {
    return this.http.put(this.apiurl + 'Machine/' + id, item, { responseType: 'text' });
  }
  deleteMachine(id: number) {
    return this.http.delete(this.apiurl + 'Machine/' + id, { responseType: 'text' });
  }

  // ------------ Manufacturer ------------
  getAllManufacturers(): Observable<Machinemanufacturer[]> {
    return this.http.get<Machinemanufacturer[]>(this.apiurl + 'MachineManufacturer');
  }
  getManufacturerById(id: number): Observable<Machinemanufacturer> {
    return this.http.get<Machinemanufacturer>(this.apiurl + 'MachineManufacturer/' + id);
  }
  saveManufacturer(item: Machinemanufacturer) {
    return this.http.post(this.apiurl + 'MachineManufacturer', item, { responseType: 'text' });
  }
  updateManufacturer(item: Machinemanufacturer, id: number) {
    return this.http.put(this.apiurl + 'MachineManufacturer/' + id, item, { responseType: 'text' });
  }
  deleteManufacturer(id: number) {
    return this.http.delete(this.apiurl + 'MachineManufacturer/' + id, { responseType: 'text' });
  }

  // ------------ Location ------------
  getAllLocations(): Observable<LocationMaster[]> {
    return this.http.get<LocationMaster[]>(this.apiurl + 'Location');
  }
  getLocationById(id: number): Observable<LocationMaster> {
    return this.http.get<LocationMaster>(this.apiurl + 'Location/' + id);
  }
  saveLocation(item: LocationMaster) {
    return this.http.post(this.apiurl + 'Location', item, { responseType: 'text' });
  }
  updateLocation(item: LocationMaster, id: number) {
    return this.http.put(this.apiurl + 'Location/' + id, item, { responseType: 'text' });
  }
  deleteLocation(id: number) {
    return this.http.delete(this.apiurl + 'Location/' + id, { responseType: 'text' });
  }

  // ------------ ComponentOperation ------------
  getAllComponentOperations(): Observable<Componentoperationmaster[]> {
    return this.http.get<Componentoperationmaster[]>(this.apiurl + 'ComponentOperation');
  }
  getComponentOperationById(id: number): Observable<Componentoperationmaster> {
    return this.http.get<Componentoperationmaster>(this.apiurl + 'ComponentOperation/' + id);
  }
  saveComponentOperation(item: Componentoperationmaster) {
    return this.http.post(this.apiurl + 'ComponentOperation', item, { responseType: 'text' });
  }
  updateComponentOperation(item: Componentoperationmaster, id: number) {
    return this.http.put(this.apiurl + 'ComponentOperation/' + id, item, { responseType: 'text' });
  }
  deleteComponentOperation(id: number) {
    return this.http.delete(this.apiurl + 'ComponentOperation/' + id, { responseType: 'text' });
  }

  getOperationDetails(search: string): Observable<OperationDetailsViewModel[]> {
    return this.http.get<OperationDetailsViewModel[]>(this.apiurl + "ComponentOperation/OperationDetails?Search=" + search);
  }
}
