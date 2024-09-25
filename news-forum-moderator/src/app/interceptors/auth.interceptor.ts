import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken: string = authService.getAuthToken();
  const router = inject(Router);
  const toastrService = inject(ToastrService);

  if (authToken)
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status == 401) {
        toastrService.error('Session expired. Please sign-in again.', 'Error');
        authService.signOut();
        router.navigate(['/sign-in']);
      }

      return throwError(() => error);
    })
  );
};
