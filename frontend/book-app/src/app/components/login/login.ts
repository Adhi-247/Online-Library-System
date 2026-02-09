import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {

  // Login form
  email = '';
  password = '';
  
  // Register form
  fullName = '';
  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';
  
  // UI state
  isLoginMode = true;
  isAdminMode = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.isAdminMode = false;
    this.clearMessages();
    this.clearForms();
  }

  toggleAdminMode() {
    this.isAdminMode = !this.isAdminMode;
    this.clearMessages();
    this.clearForms();
  }

  clearMessages() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  clearForms() {
    this.email = '';
    this.password = '';
    this.fullName = '';
    this.registerEmail = '';
    this.registerPassword = '';
    this.confirmPassword = '';
  }

  onLogin() {
    this.clearMessages();
    
    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    this.isLoading = true;
    
    const loginObservable = this.isAdminMode 
      ? this.authService.adminLogin({ email: this.email, password: this.password })
      : this.authService.login({ email: this.email, password: this.password });
    
    loginObservable.subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = this.isAdminMode 
            ? 'Admin login successful! Redirecting to dashboard...'
            : 'Login successful! Redirecting...';
          setTimeout(() => {
            if (this.isAdminMode) {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/']);
            }
          }, 1500);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Login failed. Please try again.';
      }
    });
  }

  onRegister() {
    this.clearMessages();
    
    if (!this.fullName || !this.registerEmail || !this.registerPassword || !this.confirmPassword) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    if (this.registerPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.registerPassword.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      return;
    }

    this.isLoading = true;
    
    this.authService.register({
      fullName: this.fullName,
      email: this.registerEmail,
      password: this.registerPassword
    }).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          this.successMessage = 'Registration successful! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}

