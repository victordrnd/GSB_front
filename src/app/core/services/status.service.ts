import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http : HttpClient) { }

  getAll(){
    return this.http.get(`${environment.apiurl}/status`).pipe(map((res:any)=> res.result)); 
  }
}
