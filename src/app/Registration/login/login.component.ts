import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { MentorServiceService } from 'src/app/mentor-service.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  submitted: boolean=false;
  myjson={};
  response: any;
  params:any;
  userId: any;
  role: any;
  loginError: boolean=false;
  errortext: string='';
  
  constructor(private router:Router, private route: ActivatedRoute, private toastr: ToastrService, private mentorservice:MentorServiceService)
   {
    this.loginForm= new FormGroup({
    password: new FormControl(''),
      username: new FormControl('')
    });
   }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params["type"];
      console.log(this.userId,"userId");
      if(this.userId=='mentor'){ this.role=1}
      else if(this.userId=='mentee'){this.role=2} 
      else {this.role=0}
    });
}


  login(){
    this.submitted= true
    if(this.loginForm.invalid){
       this.toastr.error('Invalid')
      return
    }
    let myjson:any = {
password:this.loginForm.get("password")?.value,
username:this.loginForm.get("username")?.value,
role: this.userId
    }
this.mentorservice.login(myjson).subscribe((res:any)=>{
  if (res.status === "Success" && res.messageID === 200) {
    let data = {
      token: res.data.token,
      role: res.data.role,
      name: res.data.name,
      _id: res.data._id,
      // payment_status: res.data.payment_status,
      email: res.data.email,
    };
    localStorage.setItem("token",JSON.stringify({ data:data })
    );
    if (res.data.role === 2) {
      this.toastr.success(res.message, res.status);
      this.router.navigate(["/"], { replaceUrl: true });
    } else {
      this.toastr.success(res.message, res.status);
      this.router.navigate(["/"], {
        replaceUrl: true,
      });
    }
  } else if (res.status === "Failed" && res.messageID === 409) {
    this.toastr.error(res.message, res.status);
    // this.authService.resendEmail(res.token).subscribe((res1) => { });
    // this.router.navigate(["/email-verification"]);
  } else if (res.status === "Failed" && res.messageID === 400) {
    this.toastr.error(res.message[0].msg, res.status);
  } else {
    this.loginError = true;
    this.errortext = res.message;
    this.toastr.error(res.message, res.status);
  }
});
}

signUp() {
  if (this.userId == "mentor") {
    this.router.navigate(["/"], {
      queryParams: { data: this.userId},
    });
  } else if (this.userId== "mentee") {
    this.router.navigate(["/"], {
      queryParams: { data: this.userId },
    });
  } else {
    this.router.navigate([""]);
  }
}

}
