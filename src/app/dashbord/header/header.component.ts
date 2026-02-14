import { Component, OnInit } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fauser=faUser;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  }

logout(){
  debugger;
this.auth.logout();
}
}
