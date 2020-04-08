import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private http : HttpClient) { }

  getAllUsers(obj){
    return this.http.post(`${environment.apiurl}/users`, obj).pipe(map((res:any) => res.result));
  }

  getUser(id){
    return this.http.get(`${environment.apiurl}/users/${id}`).pipe(map((res:any) => res.result));
  }
  

  update(user){
    return this.http.post(`${environment.apiurl}/users/${user.id}`, user).pipe(map((res:any) => res.result))
  }

  delete(user){
    return this.http.delete(`${environment.apiurl}/users/delete/${user.id}`).pipe(map((res:any) => res.result));
  }
}
