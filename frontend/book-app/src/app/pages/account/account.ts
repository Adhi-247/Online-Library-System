import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.html',
})
export class Account implements OnInit {
  user: User | null = null;

  // Fake local settings – later replace with real persistence
  preferences = {
    emailNotifications: true,
    dueDateReminders: true,
    marketingEmails: false,
    defaultCategory: 'All',
    theme: 'dark',
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }

  saveSettings(): void {
    // For now this is just a UI stub.
    // Later, call an API or write to a user settings endpoint.
    alert('Preferences saved (UI only – wire to backend later).');
  }
}

