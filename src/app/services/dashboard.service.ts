import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Instituicao } from '../resources/classes/instituicao.class';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "http://localhost:3000/instituicoes";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private http: HttpClient) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    getInstituicoes(): Observable<Instituicao[]> {
        const url = `${apiUrl}`;
        return this.http.get<Instituicao[]>(url).pipe(
            tap(_ => console.log('fetched instituicoes')),
            catchError(this.handleError('getInstituicoes', []))
        );
    }

    getInstituicao(id: number): Observable<Instituicao> {
        const url = `${apiUrl}/${id}`;
        return this.http.get<Instituicao>(url).pipe(
            tap(_ => console.log(`fetched instituicao id=${id}`)),
            catchError(this.handleError<Instituicao>(`getInstituicao id=${id}`))
        );
    }

    addInstituicao(instituicao): Observable<Instituicao> {
        return this.http.post<Instituicao>(apiUrl, instituicao, httpOptions).pipe(
            tap((instituicao: Instituicao) => console.log(`added instituicao w/ id=${instituicao.id}`)),
            catchError(this.handleError<Instituicao>('addInstituicao'))
        );
    }

    updateInstituicao(id, instituicao): Observable<any> {
        const url = `${apiUrl}/${id}`;
        return this.http.put(url, instituicao, httpOptions).pipe(
            tap(_ => console.log(`updated instituicao id=${id}`)),
            catchError(this.handleError<any>('updateInstituicao'))
        );
    }

    deleteInstituicao(id): Observable<Instituicao> {
        const url = `${apiUrl}/${id}`;
        return this.http.delete<Instituicao>(url, httpOptions).pipe(
            tap(_ => console.log(`deleted instituicao id=${id}`)),
            catchError(this.handleError<Instituicao>('deleteInstituicao'))
        );
    }
}
