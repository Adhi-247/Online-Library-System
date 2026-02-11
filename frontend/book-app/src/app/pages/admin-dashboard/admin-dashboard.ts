import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {

  activeTab: string = 'dashboard';
  admin: User | null = null;
  isLoading = true;
  books: any[] = [];
  categories: any[] = [];
  newBook: any = { title: '', author: '', isbn: '', coverImage: '', pages: null, available: null, categoryId: null };
  editingBook: any = null;
  stats = {
    totalBooks: 0,
    totalUsers: 0,
    totalCategories: 0,
    activeLoans: 0
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // Check if user is admin
    this.admin = this.authService.getCurrentUser();
    if (!this.admin || this.admin.role !== 'Admin') {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBooks();
    this.loadCategories();
    this.isLoading = false;
    this.loadStats();
  }

  loadBooks(): void {
    // Request a large pageSize to fetch all books
    this.bookService.getBooks(1, 1000).subscribe({
      next: (books: any[]) => this.books = books,
      error: err => console.error('Failed to load books', err)
    });
  }

  loadCategories(): void {
    // TODO: Replace with real CategoryService call
    this.categories = [
      { id: 1, name: 'Fiction' },
      { id: 2, name: 'Science' },
      { id: 3, name: 'History' }
    ];
  }

  addBook(): void {
    if (!this.newBook.title || !this.newBook.author) return;
    this.bookService.addBook(this.newBook).subscribe({
      next: () => {
        this.loadBooks();
        this.newBook = { title: '', author: '', isbn: '', coverImage: '', pages: null, available: null, categoryId: null };
      },
      error: err => alert('Failed to add book')
    });
  }

  editBook(book: any): void {
    this.editingBook = { ...book };
  }

  deleteBook(id: number): void {
    if (!confirm('Are you sure you want to delete this book?')) return;
    this.bookService.deleteBook(id).subscribe({
      next: () => this.loadBooks(),
      error: err => alert('Failed to delete book')
    });
  }

  updateBook(): void {
    if (!this.editingBook) return;
    this.bookService.updateBook(this.editingBook.id, this.editingBook).subscribe({
      next: () => {
        this.loadBooks();
        this.editingBook = null;
      },
      error: err => alert('Failed to update book')
    });
  }

  cancelEdit(): void {
    this.editingBook = null;
  }

  loadStats(): void {
    // Placeholder - replace with actual API calls
    this.stats = {
      totalBooks: 150,
      totalUsers: 45,
      totalCategories: 12,
      activeLoans: 23
    };
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
