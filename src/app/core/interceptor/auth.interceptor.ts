import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

  const publicEndpoints = [
    '/api/users/login/',
    '/api/users/register/',
    '/api/users/password/reset/',
  ];

  if (publicEndpoints.some(url => req.url.includes(url))) {
    return next(req);
  }

  if (isBrowser) {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next(cloned);
    }
  }

  return next(req);
};
