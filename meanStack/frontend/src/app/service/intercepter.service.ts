import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {


    token: any;

    constructor(private loginService:LoginService ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      this.token = JSON.parse(localStorage.getItem("token")!)
      console.log(this.token);
      
      if (this.token) {
        const tokenizedReq = req.clone({ headers: req.headers.set('auth-token', this.token) });
        return next.handle(tokenizedReq)
      }
      return next.handle(req);
    }
}
