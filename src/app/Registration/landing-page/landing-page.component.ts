import { Component, OnInit } from '@angular/core';
import {MentorServiceService} from '../../mentor-service.service'
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
role:number=1
  constructor(private mentorService:MentorServiceService) { }

  ngOnInit(): void {
  }

}
