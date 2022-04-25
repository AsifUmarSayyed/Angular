import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url='http://192.168.0.120:3001/api/user'
  // Header={headers:{"auth-token":  JSON.parse(localStorage.getItem("token")!)}}
  constructor(private http:HttpClient) { }

getUser(){
  return this.http.get<any>(this.url)
 }
 getOneUser(id:any){
  return this.http.get<any>(this.url+"/"+id)
 }
 postUser(body:any){
   return this.http.post<any>(this.url,body)
 }
 loginUser(body:any){
  return this.http.post<any>(this.url+"/login",body)
}
 deleteUser(body:any){
  return this.http.delete<any>(this.url+"/"+body)
}
updateUser(id:any,body:any){
  return this.http.put<any>(this.url+"/"+id,body)
}

check(){  
 return !! localStorage.getItem("token")  
}
getUserToken(){
  return localStorage.getItem("token")
}
}