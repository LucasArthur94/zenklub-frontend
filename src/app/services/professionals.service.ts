import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Professional } from '../models/professional';

@Injectable({
  providedIn: 'root',
})
export class ProfessionalsService {
  url = 'http://localhost:3000/professionals';

  constructor(private httpClient: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getProfessionals(): Observable<Professional[]> {
    return this.httpClient
      .get<Professional[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem um Professionalro pelo id
  getProfessionalById(id: number): Observable<Professional> {
    return this.httpClient
      .get<Professional>(this.url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      return throwError(error.error.message);
    } else {
      // Erro ocorreu no lado do servidor
      return throwError(
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`
      );
    }
  }
}
