import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './book-card.html',
  styleUrls: ['./book-card.css']
})
export class BookCard {
  @Input() book: any;
}
