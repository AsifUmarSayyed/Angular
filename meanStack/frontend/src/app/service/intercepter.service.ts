import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {


    token: any;

    constructor(private loginService:LoginService ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      this.token = /* this.loginService.getUserToken() */false;
      console.log(this.token);
      
      if (this.token) {
        const tokenizedReq = req.clone({ headers: req.headers.set('auth-token', this.token) });
        return next.handle(tokenizedReq);
      }
      return next.handle(req);
    }
}
