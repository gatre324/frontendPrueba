import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthStore } from '../auth/auth.store';

export const errorInterceptor: HttpInterceptorFn = (request, next) => { const store = inject(AuthStore); const router = inject(Router); return next(request).pipe(catchError((error: HttpErrorResponse) => { if (error.status === 401 && !request.url.endsWith('/login')) { store.clearSession(); void router.navigate(['/login']); } return throwError(() => error); })); };
