import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
})
export class Login {

  username = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.username === 'admin' && this.password === 'admin') {
      alert('Login Successful');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid Credentials');
    }
  }
}
