import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./shared/component/layout/layout.component"),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import("./gourmet/dashboard/dashboard.component")
            },
            {
                path: 'pedidos',
                loadComponent: () => import("./gourmet/pedidos/pedidos.component")
            },
            {
                path: 'mesa',
                loadComponent: () => import("./gourmet/mesa/mesa.component")
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import("./gourmet/auth/login/login.component")
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
