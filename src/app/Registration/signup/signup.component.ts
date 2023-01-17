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
      date_of_birth: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      username: new FormControl(''),
      role:new FormControl(''),
    });
  }

  ngOnInit(): void {

    setTimeout(() => this.toastr.success('sup'))
  }

  SignUp(){
    
    // this.submitted= true
    // if(this.signupForm.invalid){
    //    this.toastr.error('Invalid')
    //   return
    // }
    
    
    let myjson:any = {
firstName:this.signupForm.get("firstName")?.value,
lastName:this.signupForm.get("lastName")?.value,
email:this.signupForm.get("email")?.value,
date_of_birth:this.signupForm.get("date_of_birth")?.value,
phone:this.signupForm.get("phone")?.value,
username:this.signupForm.get("username")?.value,
role:1
    }
    console.log(myjson,"myjson");
this.mentorservice.signUpMentor(myjson).subscribe((res:any)=>{
  // this.response = data
  // this.response = 
  if (res.status === "Success" && res.messageID === 200) {
    this.toastr.success(res.message, res.status);
    //this.router.navigate(['/email-verification'], { queryParams: { token: res.data } })
  }
  else if (res.status === "failed" && res.messageID === 400) {
    this.toastr.error(res.message[0].msg, res.status);
  }
  else {
    this.toastr.error(res.message, res.status);
  }
})
  }

}
