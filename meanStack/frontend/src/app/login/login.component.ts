import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { json } from 'body-parser';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({  
    email: new FormControl(''),
    password: new FormControl(''),    
   
  });
  constructor(private router:Router,private http:HttpClient,private userService:LoginService) { }

  ngOnInit(): void {
    console.log(localStorage.getItem("token"));
  }
  sign(){
    this.router.navigate(["signup"])
  }
  onSubmit(){
  
    if(!this.userForm.invalid){
    
      console.warn(this.userForm.value);
  this.userService.loginUser(this.userForm.value).subscribe(data=>{ 
    
    
    console.log("user login Successfully!!");
localStorage.setItem("token",JSON.stringify(data.token))
  this.router.navigate(["home/",data.user._id])
},err=>{
    alert(err.error);

  
    
  })

   
    }
    else{
      alert("Something went wrong")
    }
   
    
  }

}
