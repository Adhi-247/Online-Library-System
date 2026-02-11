import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { Login } from './components/login/login';
import { UserDashboard } from './pages/user-dashboard/user-dashboard';
import { Account } from './pages/account/account';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { BookDetail } from './pages/book-detail/book-detail';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: Catalog },
  { path: 'login', component: Login },
  { path: 'dashboard', component: UserDashboard },
  { path: 'account', component: Account },
  { path: 'admin/dashboard', component: AdminDashboard },
  { path: 'book/:id', component: BookDetail },
];
