import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const publicEndpoints = [
    '/api/users/login/',
    '/api/users/register/',
    '/users/token/refresh/',
  ];

  // Si la URL coincide con alguna pública, no agregar el token
  if (publicEndpoints.some(url => req.url.includes(url))) {
    return next(req);
  }

  const token = localStorage.getItem('accessToken');

  if (token) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(cloned);
  }

  return next(req);
};
