import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpEvent
} from '@angular/common/http';

import { Factura } from '../../models/factura.model';

import {
  Observable,
  BehaviorSubject
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private api = 'http://127.0.0.1:8000/api/facturas';

  constructor(private http: HttpClient) {}

  // =========================
  // SISTEMA DE REFRESH GLOBAL
  // =========================

  private refresh$ = new BehaviorSubject<boolean>(false);

  refreshFacturas() {
    this.refresh$.next(true);
  }

  getRefreshListener() {
    return this.refresh$.asObservable();
  }

  // =========================
  // API
  // =========================

  getFacturas(): Observable<Factura[]> {

    return this.http.get<Factura[]>(this.api);
  }

  // =========================
  // SUBIR FACTURA CON PROGRESO
  // =========================

  subirFactura(file: File): Observable<HttpEvent<any>> {

    const formData = new FormData();

    formData.append('file', file);

    return this.http.post<any>(
      `${this.api}/upload`,
      formData,
      {

        reportProgress: true,

        observe: 'events'
      }
    );
  }
}