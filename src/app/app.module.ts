import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, fr_FR } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,  HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { ActivityListComponent } from './pages/dashboard/activity-list/activity-list.component';
import { FraisComponent } from './pages/frais/frais.component';
import { FraisDetailComponent } from './pages/frais/frais-detail/frais-detail.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { UsersComponent } from './pages/users/users.component';
import { UserDetailsComponent } from './pages/users/user-details/user-details.component';
import { SpinComponent } from './shared/spin/spin.component';
import { UserActivityListComponent } from './pages/users/user-details/user-activity-list/user-activity-list.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { FraisFilterComponent } from './pages/frais/frais-filter/frais-filter.component';
import { UserEditComponent } from './pages/users/user-edit/user-edit.component';
registerLocaleData(fr);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ActivityListComponent,
    FraisComponent,
    FraisDetailComponent,
    UsersComponent,
    UserDetailsComponent,
    SpinComponent,
    UserActivityListComponent,
    FraisFilterComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    ScrollingModule,
  ],
  entryComponents : [
    UserEditComponent
  ],
  providers: [
    { provide: NZ_I18N, useValue: fr_FR },
    {provide : LOCALE_ID, useValue : "fr-FR"},
    {provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
