import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

   constructor( private router:Router) { }

     //Set User Secure Token
     setSecureToken(secure_token: string) {
      localStorage.setItem("token", secure_token)
    }
  
    //Set User Secure Token
    getSecureToken() {
      return localStorage.getItem("token")
    }
  
    //Check User is token or not!
    isLoggednIn() {
      return this.getSecureToken() !== null;
    }
  
    //Logout method
    logout() {
      localStorage.removeItem("token");
      this.router.navigate(["/"]);
    }


  
}
