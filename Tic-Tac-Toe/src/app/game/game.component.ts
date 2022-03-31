import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  box: any = document.getElementsByClassName('box');
  msg: any = document.getElementsByClassName('msg');
  par:any=false;
  xinc:any=0;
  oinc:any=0;
  xArr: any = [];
  oArr: any = [];
  arr: any = ['', '', '', '', '', '', '', '', ''];
  result: any=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  count = 0;
  constructor( private router:Router) {}
  ngOnInit(): void {}
  cl(a: any) {
    this.value(a);
   this.draw();     
  }
  value(a: any) {
    if (this.box[a].innerText == '') {
      if (this.count == 0) {
       this.msg[0].innerText='Player Second [0] Chance';
        let x: any = [];
        this.box[a].innerText = 'X';
        this.arr[a] = 'X';
        this.count = 1;
        for (let i = 0; i < this.arr.length; i++) {
          if (this.arr[i] == 'X') {
            x.push(i);
          }
        }
        this.xArr = x;
               this.check();
      } else {
        this.msg[0].innerText='Player First [X] Chance';
        let o: any = [];
        this.box[a].innerText = '0';
        this.arr[a] = '0';
        this.count = 0;
        for (let i = 0; i < this.arr.length; i++) {
          if (this.arr[i] == '0') {
            o.push(i);
          }
        }
        this.oArr = o;
       
        this.check();
      }
    } else {
      alert('already clicked');
    }
  }
  check()  
  {
    if(this.par==false){
         let j=0
   this.xinc=0
   this.oinc=0
      for (let k= 0; k < this.result.length; k++)
       {        
    this.xinc=0
    this.oinc=0
    for (let i = 0; i < this.result[k].length; i++)
         {     
                   for ( j = 0; j < this.xArr.length; j++)
            {
              if(this.result[k][i]==this.xArr[j])             
                this.xinc++;         
              if(this.xinc==3)  {         
               alert("x won!!") 
               this.router.navigate(["result/0"]);
               this.par=true
              }            
              }            
              for ( let l = 0; l < this.xArr.length; l++)
       {
         if(this.result[k][i]==this.oArr[l])             
           this.oinc++;         
         if(this.oinc==3){           
          alert("o won!!")
          this.router.navigate(["result/1"]);
          this.par=true
              }      
        } 
      }         
       }
      }
      
    }
      draw(){
        let count=0;
        for (let i = 0; i < this.arr.length; i++) {
         if(this.arr[i]!=""){
           count++;
         }          
        }
        if(count==this.arr.length && this.oinc!=3 && this.xinc!=3){
          alert("draw!!");
          this.router.navigate(["result/2"]);
         
                }
      }
    }