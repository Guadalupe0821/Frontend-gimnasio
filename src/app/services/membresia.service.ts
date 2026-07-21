
// src/app/services/membresia.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Membresia } from '../models/membresia';

@Injectable({
  providedIn: 'root'
})

export class MembresiaService {

  private apiUrl = 'http://192.168.1.169:8080/api/membresias';

  constructor(private http: HttpClient) {}

  getMembresias(): Observable<Membresia[]> {
    return this.http.get<Membresia[]>(this.apiUrl);
  }

  guardarMembresia(membresia: Membresia): Observable<Membresia> {
    return this.http.post<Membresia>(this.apiUrl, membresia);
  }

  actualizarMembresia(id: number, membresia: Membresia): Observable<Membresia> {
    return this.http.put<Membresia>(`${this.apiUrl}/${id}`, membresia);
  }

  eliminarMembresia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
