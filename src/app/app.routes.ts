import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/component/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./gourmetClient/dashboard/dashboard.component'),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./gourmetClient/productos/productos.component'),
      },
      {
        path: 'reservar-mesa',
        loadComponent: () =>
          import('./gourmetClient/reservar-mesa/reservar-mesa.component'),
      },
      {
        path: 'pedido',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./gourmetClient/pedido/pedido.component'),
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./gourmetClient/detalle-usuario/detalle-usuario.component'),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./gourmetClient/auth/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./gourmetClient/auth/register/register.component'),
  },
  {
    path: 'login-admin',
    loadComponent: () => import('./gourmetAdmin/login/login.component'),
  },
  {
    path: 'dashboard-admin',
    loadComponent: () => import('./gourmetAdmin/dashboard/dashboard.component'),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
