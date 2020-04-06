import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { distinctUntilChanged, map, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { Socket } from 'ngx-socket-io';
//import { NgxPermissionsService } from 'ngx-permissions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private currentUserSubject = new BehaviorSubject<any>({});
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<any>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();


  public permissions : Array<any>;
  constructor(private http : HttpClient,
    private permissionsService : NgxPermissionsService,
    private socket : Socket) { }

  async populate() {
    if (this.getToken()) {
      try {
        const res: any = await this.http
          .get(`${environment.apiurl}/auth/current`)
          .toPromise();
        this.setAuth(res.result);
        this.isAuthenticatedSubject.next(true);
        return true;
      } catch (error) {
        this.purgeAuth();
        this.isAuthenticatedSubject.next(false);
        return false;
      }
    } else {
      this.purgeAuth();
      return false;
    }
  }

  async setAuth({ user, token }: any) {
    if(token){
      this.saveToken(token);      
    }
    this.socket.emit('user.login', user);
    const permissions = await this.loadPermissions().toPromise();
    this.permissionsService.loadPermissions(permissions);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  attemptAuth(credentials): any {
    return this.http.post(`${environment.apiurl}/auth/login`, credentials).pipe(map((res: any) => {
      this.setAuth(res.result);      
      return res.result;
    }),
      catchError(this.formatErrors));
  }


  addUser(user: any): any {
    return this.http
      .post(`${environment.apiurl}/auth/signup`, user)
      .pipe(map((result: any) => result.result));
  }




  purgeAuth() {
    this.destroyToken();
    this.currentUserSubject.next({});
    this.isAuthenticatedSubject.next(false);
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  destroyToken() {
    localStorage.removeItem('token');
  }

  loadPermissions(){
    return this.http.get(`${environment.apiurl}/auth/permissions`).pipe(map((res:any) => res.result));
  }
}