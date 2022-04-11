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
activeAns:any=[]
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
   localStorage.getItem("ans")?this.ans=JSON.parse(localStorage.getItem("ans")!):"";
 
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

     
        this.activeAns = this.ans.filter((res: any) => {
        return res._id.toLocaleLowerCase()
        .match(this._id.toLocaleLowerCase());
       }); 
       
         
      for (let i = 0; i < this.ans.length; i++)this.ans[i]._id==this._id?this.ans[i].answers=this.activeAns[0].answers:""
      localStorage.setItem("ans",JSON.stringify(this.ans))
    
       localStorage.setItem("checked",JSON.stringify( this.activeAns[0].answers))
       
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
      this.activeAns[0].answers[this.counter]=arr
      for (let i = 0; i < this.ans.length; i++)this.ans[i]._id==this._id?this.ans[i].answers=this.activeAns[0].answers:""
      localStorage.setItem("ans",JSON.stringify(this.ans))    
   }
    else{
      let arr:any
      for (let i = 0; i < this.radio.length; i++) this.radio[i].checked==true?arr=i:"";
      this.activeAns[0].answers[this.counter]=arr
      for (let i = 0; i < this.ans.length; i++)this.ans[i]._id==this._id?this.ans[i].answers=this.activeAns[0].answers:""
      localStorage.setItem("ans",JSON.stringify(this.ans))
    }

    //onsole.log( this.activeAns[0].answers);
 
    localStorage.setItem("checked",JSON.stringify( this.activeAns[0].answers))  

   for (let i = 0; i <  this.ans.length; i++){
   if(this.ans[i]._id==this._id){
     for (let j = 0; j < this.ans[i].answers.length; j++) {     
     
      
       if (JSON.stringify(this.ans[i].answers[j])==JSON.stringify(this.ans[i].correctAns[j])) {
          localStorage.setItem("correct",JSON.stringify(++this.correct))
        }
   }
  console.log(this.correct)
  console.log(this.ans[i].correctAns[i])

  }
}
  
      this.router.navigate(["result/",this.dataId.id])
   
   
    }
 check(){
   if(this.options[this.counter-1].type=="Multiple-Response"){
    let arr:any=[]
      for (let i = 0; i < this.checkBox.length; i++) this.checkBox[i].checked==true?arr.push(i):""
      this.activeAns[0].answers[this.counter-1]=arr
      for (let i = 0; i < this.ans.length; i++)this.ans[i]._id==this._id?this.ans[i].answers=this.activeAns[0].answers:""
      localStorage.setItem("ans",JSON.stringify(this.ans))
   }
   else{
    let arr:any
    for (let i = 0; i < this.radio.length; i++)this.radio[i].checked==true?arr=i:""
    this.activeAns[0].answers[this.counter-1]=arr
    for (let i = 0; i < this.ans.length; i++)this.ans[i]._id==this._id?this.ans[i].answers=this.activeAns[0].answers:""
    localStorage.setItem("ans",JSON.stringify(this.ans))
    }
    localStorage.setItem("checked",JSON.stringify( this.activeAns[0].answers))

    //console.log( this.activeAns[0].answers);
    
 }
pre(){
  
    if(this.options[this.counter].type=="Multiple-Response"){
     let arr:any=[]
      for (let i = 0; i < this.checkBox.length; i++) this.checkBox[i].checked==true?arr.push(i):""
      this.activeAns[0].answers[this.counter]=arr
      for (let i = 0; i < this.ans.length; i++)this.ans[i]._id==this._id?this.ans[i].answers=this.activeAns[0].answers:""
      localStorage.setItem("ans",JSON.stringify(this.ans))  
    }
    else{
      let arr:any
      for (let i = 0; i < this.radio.length; i++)this.radio[i].checked==true?arr=i:""
      this.activeAns[0].answers[this.counter]=arr
      for (let i = 0; i < this.ans.length; i++)this.ans[i]._id==this._id?this.ans[i].answers=this.activeAns[0].answers:""
      localStorage.setItem("ans",JSON.stringify(this.ans))
    }   
    localStorage.setItem("checked",JSON.stringify( this.activeAns[0].answers))

    //console.log( this.activeAns[0].answers);
    localStorage.getItem("ans")?this.ans=JSON.parse(localStorage.getItem("ans")!):""
    this.counter--;
    localStorage.setItem("counter",JSON.stringify(this.counter))
 }   
}