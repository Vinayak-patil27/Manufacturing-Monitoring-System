import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
private auth:any

  fauser=faUser;
  constructor() { }

  ngOnInit(): void {
  }

logout(){
  debugger;
this.auth.logout();
}
}
