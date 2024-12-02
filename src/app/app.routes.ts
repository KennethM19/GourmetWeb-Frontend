import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';
import { authenticatedGuard } from './core/guard/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./shared/component/layout/layout.component"),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import("./gourmet/dashboard/dashboard.component"),
                canActivate: [authGuard]
            },
            {
                path: 'pedidos',
                loadComponent: () => import("./gourmet/pedidos/pedidos.component"),
                canActivate: [authGuard]
            },
            {
                path: 'mesa',
                loadComponent: () => import("./gourmet/mesa/mesa.component"),
                canActivate: [authGuard]
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import("./gourmet/auth/login/login.component"),
        canActivate: [authenticatedGuard]
    },
    {
        path: 'register',
        loadComponent: () => import("./gourmet/auth/register/register.component")
    },
    {
        path:'**',
        redirectTo: 'dashboard',
    }
];
