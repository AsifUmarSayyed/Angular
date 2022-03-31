import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {  
dataId:any
count:any ;
currentTests:any=[]
options:any=[]
counter:any=0
correct:any=0
ans:any=[]
_id:any
correctAns:any=[]
questionId:any
radio: any = document.getElementsByClassName('option'); 
checkBox: any = document.getElementsByClassName('checkBox'); 
constructor(private http:HttpClient, private router:Router, private activatedRoute:ActivatedRoute) {}
ngOnInit(): void {
   localStorage.getItem("testCompleted")? this.router.navigate([""]):"";
   localStorage.getItem("counter")?this.counter=JSON.parse(localStorage.getItem("counter")!):"";
   localStorage.getItem("correct")?this.correct=JSON.parse(localStorage.getItem("correct")!):"";
   this.activatedRoute.params.subscribe(aData=>{     
      this.dataId=aData
      this.questionId=this.dataId.id
      this._id=this.dataId.id;
      localStorage.setItem("questionId",JSON.stringify(this.questionId)) 
   })
  this.http.get<any>("https://dip-kaluse.github.io/examport/portal.json").subscribe(data=>{
      this.currentTests = data.tests.filter((res: any) => {
        return res._id
          .toLocaleLowerCase()
          .match(this._id.toLocaleLowerCase());
      });    
      this.options=this.currentTests[0].questions  
      console.log(this.options );
      
      if( localStorage.getItem("ans")){      
        this.ans=JSON.parse(localStorage.getItem("ans")!)
      }else{
        for (let i = 0; i < this.currentTests[0].questions.length; i++) this.options[i].type=="Multiple-Response"?this.ans.push([null,null]):this.ans.push(null);
          localStorage.setItem("ans",JSON.stringify(this.ans))
      }
      for (let i = 0; i < this.currentTests[0].questions.length; i++) {
        this.correctAns.push(this.currentTests[0].questions[i].correctOptionIndex)
      }
   })
 }
next(){      
        this.counter++;
        localStorage.setItem("counter",JSON.stringify(this.counter))
        this.check()
        localStorage.getItem("ans")?this.ans=JSON.parse(localStorage.getItem("ans")!):""
       }
 finish(){
    if(this.options[this.counter].type=="Multiple-Response"){    
      let arr:any=[]
      for (let i = 0; i < this.checkBox.length; i++) this.checkBox[i].checked==true?arr.push(i):"";       
      this.ans[this.counter]=arr
      localStorage.setItem("ans",JSON.stringify(this.ans))    
   }
    else{
      let arr:any
      for (let i = 0; i < this.radio.length; i++) this.radio[i].checked==true?arr=i:"";
      this.ans[this.counter]=arr
      localStorage.setItem("ans",JSON.stringify(this.ans))  
    }
   for (let i = 0; i < this.currentTests[0].questions.length; i++)JSON.stringify(this.ans[i])==JSON.stringify(this.correctAns[i])?localStorage.setItem("correct",JSON.stringify(++this.correct)):""
      this.router.navigate(["result/",this.dataId.id])
   }
 check(){
   if(this.options[this.counter-1].type=="Multiple-Response"){
    let arr:any=[]
      for (let i = 0; i < this.checkBox.length; i++) this.checkBox[i].checked==true?arr.push(i):""
      this.ans[this.counter-1]=arr
      localStorage.setItem("ans",JSON.stringify(this.ans)) 
   }
   else{
    let arr:any
    for (let i = 0; i < this.radio.length; i++)this.radio[i].checked==true?arr=i:""
      this.ans[this.counter-1]=arr
      localStorage.setItem("ans",JSON.stringify(this.ans))
    }
 }
pre(){
  
    if(this.options[this.counter].type=="Multiple-Response"){
     let arr:any=[]
      for (let i = 0; i < this.checkBox.length; i++) this.checkBox[i].checked==true?arr.push(i):""
      this.ans[this.counter]=arr
      localStorage.setItem("ans",JSON.stringify(this.ans))     
    }
    else{
      let arr:any
      for (let i = 0; i < this.radio.length; i++)this.radio[i].checked==true?arr=i:""
      this.ans[this.counter]=arr
      localStorage.setItem("ans",JSON.stringify(this.ans))
    }   
    localStorage.getItem("ans")?this.ans=JSON.parse(localStorage.getItem("ans")!):""
    this.counter--;
    localStorage.setItem("counter",JSON.stringify(this.counter))
 }   
}