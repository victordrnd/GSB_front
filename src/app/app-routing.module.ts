import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { FraisComponent } from './pages/frais/frais.component';
import { FraisDetailComponent } from './pages/frais/frais-detail/frais-detail.component';


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
    children : [
      {
        path : '',
        component: FraisComponent
      },
      {
        path: ':id',
        component: FraisDetailComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
