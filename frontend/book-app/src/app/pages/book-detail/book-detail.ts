import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-detail.html',
  styleUrls: ['./book-detail.css']
})
export class BookDetail implements OnInit {
  book: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookById(id).subscribe({
        next: (book) => {
          this.book = book;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.errorMessage = 'Book not found.';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      this.errorMessage = 'No book ID provided.';
      this.isLoading = false;
    }
  }
}
