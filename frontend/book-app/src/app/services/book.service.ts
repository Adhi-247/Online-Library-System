import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:5295/api/Books';

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getBook(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
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
