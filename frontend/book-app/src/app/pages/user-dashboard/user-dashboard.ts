import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.html',
})
export class UserDashboard implements OnInit {
  user: User | null = null;

  // Placeholder stats – later replace with real API data
  stats = {
    currentlyBorrowed: 3,
    booksRead: 47,
    overdue: 1,
  };

  // Placeholder lists
  currentlyBorrowed = [
    { title: '1984', dueDate: '2026-02-15', status: 'On time' },
    { title: 'Dune', dueDate: '2026-02-20', status: 'On time' },
    { title: 'Clean Code', dueDate: '2026-02-10', status: 'Overdue' },
  ];

  wishlist = [
    { title: 'The Hobbit', author: 'J. R. R. Tolkien' },
    { title: 'Sapiens', author: 'Yuval Noah Harari' },
  ];

  history = [
    { title: 'To Kill a Mockingbird', finishedAt: '2026-01-10' },
    { title: 'The Alchemist', finishedAt: '2025-12-03' },
  ];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}

