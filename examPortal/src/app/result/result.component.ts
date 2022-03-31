import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {

  constructor(private http:HttpClient, private router:Router, private activatedRoute:ActivatedRoute) { }
  counter:any=0
  correct:any=0
  dataId:any
  currentTests:any=[]
  options:any=[]
  ans:any=[]
  _id:any
  testCompleted:any=1
  questionId:any=null
  
  ngOnInit(): void {
  
    localStorage.setItem("testCompleted",this.testCompleted);
    localStorage.setItem("counter",this.counter);
    localStorage.setItem("ans",this.ans);
    if( localStorage.getItem("correct")){      
      this.correct=JSON.parse(localStorage.getItem("correct")!)

    }

    this.activatedRoute.params.subscribe(aData=>{
     
      this.dataId=aData
      console.log(this.dataId.id);
      this._id=this.dataId.id
      

    })
   


    this.http.get<any>("https://dip-kaluse.github.io/examport/portal.json").subscribe(data=>{
    
      this.currentTests = data.tests.filter((res: any) => {
        return res._id
          .toLocaleLowerCase()
          .match(this._id.toLocaleLowerCase());
      });
      console.log(this.currentTests);
      this.options=this.currentTests[0].questions
        })
  }

  next(){

    localStorage.clear()
    this.router.navigate([""])
  }

}
