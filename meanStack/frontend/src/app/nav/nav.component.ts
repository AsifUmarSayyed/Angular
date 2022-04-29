import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userId:any
  submitted:any
  currentUser:any
  constructor(private router:Router, private Activated:ActivatedRoute,private userService:LoginService,public fb: FormBuilder,
    private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.Activated.params.subscribe(data=>{
      console.log(data);
      this.userId=data
    
    })
     this.userService.getOneUser(this.userId.id).subscribe(data=>{
       this.currentUser=data.users});
  }
  logout(){
    if(confirm('Are you sure to Logout')){
     
     localStorage.clear()
      this.router.navigate([""])
    
    }
}
profile(){
  this.router.navigate(["/profile",this.userId.id])
}


  



}
