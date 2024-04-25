import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'https://api.example.com/clients';

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
  //  return this.http.get<any[]>('http://localhost:8001/client/v1/get-all-client');

  return this.http.get<any>('http://localhost:8001/client/v1/get-all-client').pipe(
    catchError((error: HttpErrorResponse) => {
      return throwError(error); // Devuelve el error al componente
    })
  );
  }

  getClientId(param:string): Observable<any> {
    //  return this.http.get<any[]>('http://localhost:8001/client/v1/get-all-client');
  
    return this.http.get<any>('http://localhost:8001/client/v1/client-id?shared='+param).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error); // Devuelve el error al componente
      })
    );
    }

  addClient(client: any): Observable<any> {

    console.log(client);
    return this.http.post<any>('http://localhost:8001/client/v1/create-client', client).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error); // Devuelve el error al componente
      })
    );
    }

  deleteClient(id: number): Observable<any> {
    return this.http.delete<any>('URL_DEL_SERVICIO/' + id);
  }

  updateClient(id: number, updatedPerson: any): Observable<any> {
    return this.http.put<any>('URL_DEL_SERVICIO', updatedPerson);
  }



}
