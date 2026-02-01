import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from './services/book.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  books: any[] = [];
  newBook: any = { title: '', author: '', isbn: '', publicationDate: '' };
  editingBook: any = null;
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.loading = true;
    this.errorMessage = '';
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Cannot connect to server. Make sure backend is running on http://localhost:5295';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  addBook() {
    if (!this.newBook.title || !this.newBook.author) {
      alert('Please enter title and author');
      return;
    }
    this.bookService.addBook(this.newBook).subscribe(() => {
      this.newBook = { title: '', author: '', isbn: '', publicationDate: '' };
      this.loadBooks();
    });
  }

  editBook(book: any) {
    this.editingBook = { ...book };
  }

  cancelEdit() {
    this.editingBook = null;
  }

  updateBook() {
    if (!this.editingBook.title || !this.editingBook.author) {
      alert('Please enter title and author');
      return;
    }
    this.bookService.updateBook(this.editingBook.id, this.editingBook).subscribe(() => {
      this.editingBook = null;
      this.loadBooks();
    });
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.loadBooks();
      });
    }
  }
}
