import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  tests:any=[]
  counter:any=0
  correct:any=0
  questionId:any

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    if( localStorage.getItem("testCompleted")){ 
     
    }
    else if( localStorage.getItem("questionId")){      
      alert("Plz.. Complete Active test")
      this.questionId=JSON.parse(localStorage.getItem("questionId")!)
      this.router.navigate(["question/",this.questionId]) 
    }
    //localStorage.setItem("counter",this.counter);
    localStorage.setItem("correct",this.correct);
    this.http.get<any>("https://dip-kaluse.github.io/examport/portal.json").subscribe(data=>{
      console.log(data.tests);
      this.tests=data.tests

      
    })
  }

  questions(i:any){
    console.log(i._id);
    localStorage.removeItem("testCompleted");
    
this.router.navigate(["question/",i._id])  


  }

}
