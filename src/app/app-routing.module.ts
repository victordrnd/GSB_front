import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FraisComponent } from './pages/frais/frais.component';


const routes: Routes = [
  {
    path : '',
    component : LoginComponent
  },
  {
    path:'signup',
    component : SignupComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  },
  {
    path : 'frais',
    component : FraisComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
