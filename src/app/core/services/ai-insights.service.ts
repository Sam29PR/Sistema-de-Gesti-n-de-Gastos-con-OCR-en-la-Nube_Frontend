import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiInsightsService {

  private apiUrl = 'http://localhost:8000/api/ai'; // tu backend FastAPI

  constructor(private http: HttpClient) {}

  analizarFactura(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insights`, data);
  }

  getDashboardInsights(): Observable<any> {
  return this.http.get(`${this.apiUrl}/ai/dashboard`);
}
}