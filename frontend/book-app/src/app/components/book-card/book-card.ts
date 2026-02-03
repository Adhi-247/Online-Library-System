import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './book-card.html',
  styleUrls: ['./book-card.css']
})
export class BookCard {}
