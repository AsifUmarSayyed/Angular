import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
   url='http://192.168.0.120:3000/api/product'
  //  Header={headers:{"auth-token":  JSON.parse(localStorage.getItem("token")!)}}
  constructor(private http:HttpClient,private loginService:LoginService) {
   
   }


getProduct(){
   return this.http.get<any>(this.url)
  //return this.http.get<any>(this.url)
 }
 postProduct(body:any){
   return this.http.post<any>(this.url,body)
 }
 deleteProduct(body:any){
  return this.http.delete<any>(this.url+"/"+body)
}
updateProduct(id:any,body:any){
  return this.http.put<any>(this.url+"/"+id,body)
}
}
