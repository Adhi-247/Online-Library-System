import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Catalog } from './pages/catalog/catalog';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'catalog', component: Catalog },
  { path: '', component: Login },
  { path: 'login', component: Login },
];
