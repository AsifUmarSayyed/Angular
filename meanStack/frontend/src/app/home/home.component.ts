import { HttpClient } from '@angular/common/http';
import {Component, ViewChild, OnInit} from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list:any=[]

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3002/api/product').subscribe(data=>{
      console.log(data);
      this.list=data
      console.log(this.list.Products)
      
    })
  }
  model(){
    
    (document.getElementById("model")as HTMLInputElement).style.cssText=`display: unset;`;
    (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(10px); pointer-events: none;`
  }
  dmodel(){
    
    (document.getElementById("model")as HTMLInputElement).style.cssText=`display: none;`;
    (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(0px);`
  }
  

}
