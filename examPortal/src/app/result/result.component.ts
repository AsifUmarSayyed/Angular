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

  correct:any=0
  dataId:any
  currentTests:any=[]
  options:any=[]
  ans:any=[]
  _id:any
  testCompleted:any=1
  questionId:any=null
   
  ngOnInit(): void {
    localStorage.removeItem("checked")  
    localStorage.removeItem("counter")  
    localStorage.setItem("testCompleted",this.testCompleted);
  
    // localStorage.setItem("ans",this.ans);
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


      
      this.ans=JSON.parse(localStorage.getItem("ans")!)
             for (let i = 0; i <  this.ans.length; i++) {

        if( this.ans[i]._id==this._id){
          let ans:any=[]
      for (let j = 0; j <   data.tests[i].questions.length; j++) {
        
        data.tests[i].questions[j].type=="Multiple-Response"?ans.push([null,null]):ans.push(null);
       
    }
    console.log(ans);
    
    this.ans[i].answers=ans
    localStorage.setItem("ans",JSON.stringify(this.ans));
    

        }
      }
      
        })
  }

  next(){

    //localStorage.clear()
    this.router.navigate([""])
  }

}
