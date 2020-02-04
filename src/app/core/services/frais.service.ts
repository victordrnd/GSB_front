import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  constructor(private http : HttpClient) { }


  getAll(){
    return this.http.get(`${environment.apiurl}/frais`).pipe(map((res:any) => res.result));
  }

  findById(id){
    return this.http.get(`${environment.apiurl}/frais/show/${id}`).pipe(map((res:any) => res.result));
  }
  

  update(frais){
    return this.http.post(`${environment.apiurl}/frais/update/status`,frais).pipe(map((res:any) => res.result));
  }

  stats(){
    return this.http.get(`${environment.apiurl}/frais/stats`).pipe(map((res:any) => res.result));
  }
}
