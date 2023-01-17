import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Registration/landing-page/landing-page.component';
import { LoginComponent } from './Registration/login/login.component';
import { SignupComponent } from './Registration/signup/signup.component';

const routes: Routes = [
{
  path:'signup', component:SignupComponent
},{
  path:'login', component:LoginComponent
},
{
  path:'', component:LandingPageComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
