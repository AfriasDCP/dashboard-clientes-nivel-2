import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dispositivo } from '../models/dispositivo.model';
import { DispositivoProblema } from '../models/dispositivo-problema.model';

@Injectable({
  providedIn: 'root'
})
export class DispositivosService {

  private baseUrl = 'http://10.71.46.24:8081/dispositivos/api/dispositivos-info';

  constructor(private http: HttpClient) {}

  obtenerDispositivos(params: any): Observable<Dispositivo[]> { 
    let httpParams = new HttpParams();
    
    for (let key in params) {
      if (params[key]) {
        httpParams = httpParams.set(key, params[key]);
      }
    }

    return this.http.get<Dispositivo[]>(this.baseUrl, { params: httpParams });
  }

  obtenerProblemasInterfaces(host: string): Observable<DispositivoProblema[]> {
    return this.http.get<DispositivoProblema[]>(`${this.baseUrl}/problemas-interfaces`, { params: { host } });
  }
}