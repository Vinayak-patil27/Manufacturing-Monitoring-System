import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

   constructor( private router:Router) { }

     //Set User Secure Token
     setSecureToken(secure_token: string) {
      localStorage.setItem("LoggedIn", secure_token)
    }
  
    //Set User Secure Token
    getSecureToken() {
      return localStorage.getItem("LoggedIn")
    }
  
    //Check User is LoggedIn or not!
    isLoggednIn() {
      return this.getSecureToken() !== null;
    }
  
    //Logout method
    logout() {
      localStorage.removeItem("LoggedIn");
      this.router.navigate(["/"]);
    }


  
}
