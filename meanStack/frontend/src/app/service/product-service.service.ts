import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
   url='http://192.168.0.120:3001/api/product'
   Header={headers:{"auth-token":  JSON.parse(localStorage.getItem("token")!)}}
  constructor(private http:HttpClient) {
  
   }


getProduct(){
   return this.http.get<any>(this.url,this.Header)
  //return this.http.get<any>(this.url)
 }
 postProduct(body:any){
   return this.http.post<any>(this.url,body,this.Header)
 }
 deleteProduct(body:any){
  return this.http.delete<any>(this.url+"/"+body,this.Header)
}
updateProduct(id:any,body:any){
  return this.http.put<any>(this.url+"/"+id,body,this.Header)
}
}
