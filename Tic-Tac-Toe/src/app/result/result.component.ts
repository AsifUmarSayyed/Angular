import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  id:any

  constructor(private activatedrouter:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activatedrouter.params.subscribe(data=>{
      this.id=data
      console.log(this.id.id);
      

    })

  }

  
  onSave(){
   
    this.router.navigate([""])
  }

}
