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
  ans:any=[]

  constructor(private http:HttpClient, private router:Router) { }

  ngOnInit(): void {

    // if( localStorage.getItem("testCompleted")){ 
     
    // }
    // else if( localStorage.getItem("questionId")){      
    //   alert("Plz.. Complete Active test")
    //   this.questionId=JSON.parse(localStorage.getItem("questionId")!)
    //   this.router.navigate(["question/",this.questionId]) 
    // }
    //localStorage.setItem("counter",this.counter);
    localStorage.setItem("correct",this.correct);
    localStorage.setItem("counter",JSON.stringify(this.counter));
    this.http.get<any>("https://dip-kaluse.github.io/examport/portal.json").subscribe(data=>{
      console.log(data.tests);
      this.tests=data.tests
      console.log (this.tests[0]._id);

      if(!(localStorage.getItem("ans"))){

    for (let i = 0; i < this.tests.length; i++) {
      console.log (this.tests[i]._id);
let ans:any=[]
      for (let j = 0; j < this.tests[i].questions.length; j++) {
        
      this.tests[i].questions[j].type=="Multiple-Response"?ans.push([null,null]):ans.push(null);
       
    }
    let correct:any=[]
    for (let k = 0; k <this.tests[i].questions.length; k++) {
      correct.push(this.tests[i].questions[k].correctOptionIndex)
    }
    this.ans.push({_id:this.tests[i]._id,
      answers:ans ,
      correctAns:correct});
    console.log(ans);
    

      
      localStorage.setItem("ans",JSON.stringify(this.ans))
      
      
    }
  }else{
    this.ans=JSON.parse(localStorage.getItem("ans")!)
  }
      
    })

  }

  questions(i:any){
    console.log(i._id);
    localStorage.removeItem("testCompleted");
    
this.router.navigate(["question/",i._id])  


  }

}
