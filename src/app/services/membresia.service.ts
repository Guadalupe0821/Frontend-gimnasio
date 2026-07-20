import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Membresia {

  idMembresia?: number;

  nombreMembresia: string;

  precio: number;

}


@Injectable({
  providedIn: 'root'
})
export class MembresiaService {


  private apiUrl = 'http://localhost:8080/api/membresias';


  constructor(
    private http: HttpClient
  ){}



  getMembresias(): Observable<Membresia[]>{

    return this.http.get<Membresia[]>(this.apiUrl);

  }

 /* fetchMembresias(){
    this.http.get()
  }*/


}