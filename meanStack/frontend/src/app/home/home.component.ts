import { HttpClient } from '@angular/common/http';
import {Component, ViewChild, OnInit} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from 'body-parser';
import { LoginService } from '../service/login.service';
import { ProductServiceService } from '../service/product-service.service';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list:any=[]
  flag=true
  text="Add"
  noItem:any=5
  
  userId:any
  collection = [];
 
  currentUser:any
  productForm = new FormGroup({
   
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
   
  });
  p:any=1

  constructor(private socketService: SocketService ,private http:HttpClient,private router:Router, private Activated:ActivatedRoute,private productService:ProductServiceService, private userService:LoginService) { 

    for (let i = 1; i <= this.list.length; i++) {
      this.list.products.push(`item ${i}`);
    }
  }

  ngOnInit(): void {
    
this.Activated.params.subscribe(data=>{
  console.log(data);
  this.userId=data

})
 this.userService.getOneUser(this.userId.id).subscribe(data=>{
   this.currentUser=data.users
 
  //  for (let i = 0; i < this.allUsers?.users.length; i++) {
     
  //   (this.allUsers.users[i]._id==this.userId.id)?this.currentUser=this.allUsers.users[i]:""

  //  }
   console.log(this.currentUser);
   
 })
   
    this.get()

  
  
}
  model(){
    if(this.flag){
      this.text="Add"
    }else{
      this.text="Update"
    }
    (document.getElementById("model")as HTMLInputElement).style.cssText=`display: unset;`;
    (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(10px); pointer-events: none;`
  }
  dmodel(){
    
    (document.getElementById("model")as HTMLInputElement).style.cssText=`display: none;`;
    (document.getElementById("body")as HTMLInputElement).style.cssText=`filter: blur(0px)`;
    this.get()
  }
  onSubmit(){
    if(this.flag){ 
    console.warn(this.productForm.value);  
 
    this.post(this.productForm.value);
    
  }else{
    console.log(this.productForm.value._id);
   this.put(this.productForm.value)
 
  

  }
    
    
    this.get()

  }

  get(){
    this.productService.getProduct().subscribe(data=>{
      this.list=data
      console.log(data)}
    
      ,err=>{
       localStorage.clear()
        this.router.navigate([""])
       
      
        
      }
      )

   
    }
  post(data:any){
      this.productService.postProduct(data).subscribe(data=>{
        this.list=data
        console.log(data)
        this.dmodel()

        this.productForm = new FormGroup({
          title: new FormControl(''),
          price: new FormControl(''),
          description: new FormControl(''),
          category: new FormControl(''),
          image: new FormControl(''),
         
        });
      },err=>{
         alert(err.error.message);
          
        })
  
     
      }
 delete(data:any){
   
   if (confirm('Are you sure to Delete Product')) {
         this.productService.deleteProduct(data._id).subscribe(data=>
          {
            this.get()
   
          })
    
         
  } 
      
        }


Updatemodel(item:any){
  
  this.productForm.patchValue(item)
  this.flag=false;
  this.model()
//basicModal.show()
// (document.getElementById("basicModal")as HTMLInputElement)!.show();
 localStorage.setItem("id",JSON.stringify(item._id))

 
 
 

}
addmodel(){
  this.productForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    image: new FormControl(''),
   
  });
  this.flag=true
 this.model()

}

put(item:any){
  this.productService.updateProduct(JSON.parse(localStorage.getItem("id")!),item).subscribe(
    
  (data:any)=>{
console.log(data);
this.dmodel()

  },
  (err)=>{
    alert(err.error.message);

  })


}
logout(){
if(confirm('Are you sure to Logout')){
 
 localStorage.clear()
  this.router.navigate([""])

}
}
itemPerPage(){
  this.noItem = (document.getElementById("select")as HTMLInputElement).value
  console.log((document.getElementById("select")as HTMLInputElement).value);
 
}
}
