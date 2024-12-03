import {Routes} from '@angular/router';
import {authGuard} from './core/guard/auth.guard';
import {authenticatedGuard} from './core/guard/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import("./shared/component/layout/layout.component"),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import("./gourmetClient/dashboard/dashboard.component"),
        canActivate: [authGuard]
      },
      {
        path: 'pedidos',
        loadComponent: () => import("./gourmetClient/pedidos/pedidos.component"),
        canActivate: [authGuard]
      },
      {
        path: 'reservar-mesa',
        loadComponent: () => import("./gourmetClient/reservar-mesa/reservar-mesa.component"),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import("./auth/login/login.component"),
    canActivate: [authenticatedGuard]
  },
  {
    path: 'register',
    loadComponent: () => import("./auth/register/register.component")
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }
];
