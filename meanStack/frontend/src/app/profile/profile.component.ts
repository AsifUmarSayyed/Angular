import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../service/login.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
show:any=false
btntxt:any
  userId: any
  submitted: any
  currentUser: any
  imageUrl:any
  constructor(private router: Router, private Activated: ActivatedRoute, private userService: LoginService, public fb: FormBuilder,
    private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.Activated.params.subscribe(data => {
      console.log(data);
      this.userId = data

    })
    this.userService.getOneUser(this.userId.id).subscribe(data => {
      this.currentUser = data.users
      console.log(this.currentUser);
      
      this.imageUrl=  this.currentUser?.image;
    });
  }


  /*##################### Registration Form #####################*/
  registrationForm = this.fb.group({
    file: [null]
  })

  /*########################## File Upload ########################*/
 
 


  id: any;
  uploadFile(event: any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;  
        console.log(this.imageUrl);
        
      };
    }
  }
}
