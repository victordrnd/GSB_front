import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  constructor(private http : HttpClient) { }


  getAll(obj){
    return this.http.post(`${environment.apiurl}/frais`, obj).pipe(map((res:any) => res.result));
  }

  findById(id){
    return this.http.get(`${environment.apiurl}/frais/show/${id}`).pipe(map((res:any) => res.result));
  }
  
  getAllType(){
    return this.http.get(`${environment.apiurl}/frais/types`).pipe(map((res:any) => res.result));
  }

  update(frais){
    return this.http.post(`${environment.apiurl}/frais/update/status`,frais).pipe(map((res:any) => res.result));
  }

  stats(){
    return this.http.get(`${environment.apiurl}/frais/stats`).pipe(map((res:any) => res.result));
  }

  groupByType(){
    return this.http.get(`${environment.apiurl}/frais/types/count`).pipe(map((res:any) => res.result));
  }

  export(from, to, user_id = null){
    let obj = {
      from : from,
      to : to,
      user_id : user_id
    }
    return this.http.post(`${environment.apiurl}/frais/export`, obj).pipe(map((res:any) => res.result));
  }
}
