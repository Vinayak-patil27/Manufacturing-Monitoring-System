import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiurl:string;
  private token:string ="";
  constructor(private http : HttpClient) { 
    this.apiurl="http://localhost:5002/api/";
  }

  login(user:string,password:string)
  {
    return this.http.post(this.apiurl+"User/login?username="+user+"&password="+password, { responseType: 'text' });
  }
}
