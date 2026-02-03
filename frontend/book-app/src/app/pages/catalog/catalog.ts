import { Component } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [BookCard],
  templateUrl: './catalog.html'
})
export class Catalog {}
