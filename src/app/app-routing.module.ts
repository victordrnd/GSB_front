import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FraisComponent } from './pages/frais/frais.component';
import { FraisDetailComponent } from './pages/frais/frais-detail/frais-detail.component';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/users/user-details/user-details.component';
import { AuthGuardService } from './core/guards/auth-guard.service';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { SettingsComponent } from './pages/settings/settings.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate : [AuthGuardService]
  },
  {
    path: 'frais',
    canActivate : [AuthGuardService],
    children: [
      {
        path: '',
        component: FraisComponent,
        canActivate : [NgxPermissionsGuard],
        data : {
          permissions: {
            only : "frais.view"
          }
        }
      },
      {
        path: ':id',
        component: FraisDetailComponent
      }
    ]
  },
  {
    path: 'users',
    canActivate : [AuthGuardService],
    children: [
      {
        path: '',
        component: UsersComponent,
        canActivate : [NgxPermissionsGuard],
        data : {
          permissions: {
            only : "users.view"
          }
        }
      },
      {
        path : ':id',
        component : UserDetailsComponent
      }
    ]
  },
  {
    path : 'settings',
    canActivate: [AuthGuardService],
    children : [
      {
        path : '',
        component : SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
