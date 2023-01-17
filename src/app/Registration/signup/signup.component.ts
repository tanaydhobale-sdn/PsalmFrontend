import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { MentorServiceService } from 'src/app/mentor-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  submitted: boolean=false;
  myjson={};
  response: any;
  signupdata: any;
  constructor( private toastr: ToastrService, private mentorservice:MentorServiceService  ) { 
    this.signupForm= new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      dob: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      username: new FormControl('')
    });
  }

  ngOnInit(): void {

    setTimeout(() => this.toastr.success('sup'))
  }

  SignUp(){
    this.submitted= true
    if(this.signupForm.invalid){
       this.toastr.error('Invalid')
      return
    }
    
    
    let myjson:any = {
firstName:this.signupForm.get("firstName")?.value,
lastName:this.signupForm.get("lastName")?.value,
email:this.signupForm.get("email")?.value,
date_of_birth:this.signupForm.get("dob")?.value,
phone:this.signupForm.get("phone")?.value,
username:this.signupForm.get("username")?.value,
role:1
    }
    console.log(myjson,"myjson");
this.mentorservice.signUpMentor(myjson).subscribe((data)=>{
  this.response = data
  if(this.response){
    this.toastr.success("Signup successfully")
    this.signupdata=this.response.data
  }else{
    this.toastr.error("Something went wroung")
  }
})
  }

}
