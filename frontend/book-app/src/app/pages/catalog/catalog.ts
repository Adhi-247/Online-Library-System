import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCard } from '../../components/book-card/book-card';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, BookCard],
  templateUrl: './catalog.html'
})
export class Catalog implements OnInit {
  books: any[] = [];
  loading = true;
  loadingMore = false;
  error = '';
  currentPage = 1;
  pageSize = 20;
  hasMore = true;

  constructor(private bookService: BookService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Catalog component initialized');
    this.loadBooks();
  }

  loadBooks() {
    console.log('Loading books - page:', this.currentPage);
    this.loading = true;
    this.error = '';
    
    this.bookService.getBooks(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        console.log('Books loaded successfully:', data?.length || 0);
        this.books = data || [];
        this.loading = false;
        this.hasMore = data && data.length === this.pageSize;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR loading books:', err);
        console.error('Error name:', err.name);
        console.error('Error message:', err.message);
        this.error = 'Failed to load books. Please check console for details.';
        this.loading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('Books observable completed');
      }
    });
  }

  loadMore() {
    console.log('Load More button clicked, loading page:', this.currentPage + 1);
    this.loadingMore = true;
    this.currentPage++;
    this.bookService.getBooks(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        if (data && data.length > 0) {
          this.books = [...this.books, ...data];
          this.hasMore = data.length === this.pageSize;
          console.log('Loaded more books:', data.length);
        } else {
          this.hasMore = false;
          console.log('No more books to load.');
        }
        this.loadingMore = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading more books:', err);
        this.loadingMore = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('Load more observable completed');
      }
    });
  }
}
