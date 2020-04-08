import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http : HttpClient) { }


  getAllRoles(){ 
    return this.http.get(`${environment.apiurl}/roles`).pipe(map((res:any) => res.result));
  }


  addPermissions(role_id, list){
    return this.http.post(`${environment.apiurl}/roles/${role_id}/add`, {permissions : list}).pipe(map((res:any) => res.result));
  }


  removePermissions(role_id, list){
    return this.http.post(`${environment.apiurl}/roles/${role_id}/remove`, {permissions : list}).pipe(map((res:any) => res.result));
  }
}
