import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:5295/api/Books';

  constructor(private http: HttpClient) {}

  getBooks(page: number = 1, pageSize: number = 20) {
    return this.http.get<any[]>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`).pipe(
      timeout(10000),
      catchError(error => {
        console.error('Book service error:', error);
        return throwError(() => error);
      })
    );
  }

  getBooksCount() {
    return this.http.get<number>(`${this.apiUrl}/count`).pipe(
      timeout(10000),
      catchError(error => throwError(() => error))
    );
  }

  getBook(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      timeout(10000),
      catchError(error => throwError(() => error))
    );
  }

  getBookById(id: string | number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      timeout(10000),
      catchError(error => throwError(() => error))
    );
  }

  addBook(book: any) {
    return this.http.post(this.apiUrl, book);
  }

  updateBook(id: number, book: any) {
    return this.http.put(`${this.apiUrl}/${id}`, book);
  }

  deleteBook(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
