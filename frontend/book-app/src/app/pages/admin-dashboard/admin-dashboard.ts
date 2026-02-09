import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {

  admin: User | null = null;
  isLoading = true;

  // Dashboard stats (you can fetch these from backend later)
  stats = {
    totalBooks: 0,
    totalUsers: 0,
    totalCategories: 0,
    activeLoans: 0
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Check if user is admin
    this.admin = this.authService.getCurrentUser();
    
    if (!this.admin || this.admin.role !== 'Admin') {
      this.router.navigate(['/login']);
      return;
    }

    this.isLoading = false;
    
    // TODO: Fetch dashboard stats from backend
    this.loadStats();
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
