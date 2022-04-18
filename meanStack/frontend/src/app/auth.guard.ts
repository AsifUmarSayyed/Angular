import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { LoginService } from './service/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService:LoginService,private router:Router){}
  canActivate() {
    if(this.userService.check()){
      return true;
    }
    else{
this.router.navigate([""])
    return false;
  }
}

}
