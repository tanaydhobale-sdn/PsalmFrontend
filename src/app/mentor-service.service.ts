import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MentorServiceService {

  constructor(private http: HttpClient) {

   }
   url=environment.apiUrl;

   signUpMentor(body:any) {
    return this.http.post(this.url + "mentor/register", body,{
    });
  }
  login(body:any){
    console.log(this.url);
    
    return this.http.post(this.url + "/auth/login",body);
  }
}
